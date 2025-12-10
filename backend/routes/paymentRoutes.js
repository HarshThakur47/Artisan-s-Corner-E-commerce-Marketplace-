const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/authMiddleware');

// Initialize Razorpay (with fallback for missing keys)
let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} catch (error) {
  console.warn('Razorpay not configured - payment features will be disabled');
  razorpay = null;
}

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error('Invalid amount');
  }

  if (!razorpay) {
    res.status(503);
    throw new Error('Payment service not configured. Please set up Razorpay keys.');
  }

  try {
    const options = {
      amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
      currency: currency,
      receipt: `order_${Date.now()}`,
      notes: {
        user_id: req.user._id.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500);
    throw new Error('Error creating payment order');
  }
});

// @desc    Verify payment signature
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400);
    throw new Error('Missing payment verification parameters');
  }

  try {
    // Verify the payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({
        verified: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400);
      throw new Error('Invalid payment signature');
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500);
    throw new Error('Error verifying payment');
  }
});

// @desc    Get payment details
// @route   GET /api/payment/:paymentId
// @access  Private
const getPaymentDetails = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    res.json(payment);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500);
    throw new Error('Error fetching payment details');
  }
});

// @desc    Razorpay webhook handler
// @route   POST /api/payment/webhook
// @access  Public
const handleWebhook = asyncHandler(async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];

  try {
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature === expectedSignature) {
      const event = req.body;

      switch (event.event) {
        case 'payment.captured':
          console.log('Payment captured successfully:', event.payload.payment.entity.id);
          // Here you would typically update your order status
          break;
        case 'payment.failed':
          console.log('Payment failed:', event.payload.payment.entity.id);
          break;
        default:
          console.log(`Unhandled event: ${event.event}`);
      }

      res.json({ received: true });
    } else {
      res.status(400);
      throw new Error('Invalid webhook signature');
    }
  } catch (error) {
    console.error('Webhook verification failed:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/:paymentId', protect, getPaymentDetails);
router.post('/webhook', express.json(), handleWebhook);

module.exports = router;
