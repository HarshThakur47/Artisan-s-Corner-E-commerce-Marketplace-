import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus, FaBox, FaShoppingBag, FaUsers } from 'react-icons/fa';
import { getProducts, deleteProduct, createProduct } from '../store/slices/productSlice';
import { getOrders } from '../store/slices/orderSlice';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const productState = useSelector((state) => state.product);
  const orderState = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(getProducts());
      if (activeTab === 'orders') dispatch(getOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, user, activeTab]);

  const handleDeleteProduct = (id) => {
    if (window.confirm('Delete this product?')) {
      dispatch(deleteProduct(id));
      toast.success('Product Deleted');
    }
  };

  const handleCreateProduct = async () => {
    if (window.confirm('Create sample product?')) {
      await dispatch(createProduct());
      toast.success('Product Created');
      dispatch(getProducts()); 
    }
  };

  const statCardStyle = {
    background: colors.surface, padding: '2rem', borderRadius: '16px',
    boxShadow: `0 4px 12px ${colors.shadow}`, border: `1px solid ${colors.border}`,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: colors.text }}>Admin Dashboard</h1>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={statCardStyle}>
            <div>
              <p style={{ color: colors.textSecondary, fontSize: '0.875rem' }}>Total Products</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: colors.text }}>{productState.products.length}</h2>
            </div>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${colors.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, fontSize: '1.5rem' }}>
              <FaBox />
            </div>
          </div>
          
          <div style={statCardStyle}>
            <div>
              <p style={{ color: colors.textSecondary, fontSize: '0.875rem' }}>Total Orders</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: colors.text }}>{orderState.orders.length}</h2>
            </div>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${colors.success}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.success, fontSize: '1.5rem' }}>
              <FaShoppingBag />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2rem', borderBottom: `2px solid ${colors.divider}`, marginBottom: '2rem' }}>
          {['products', 'orders'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '1rem 0', background: 'transparent', border: 'none',
              fontSize: '1rem', fontWeight: activeTab === tab ? '600' : '500',
              color: activeTab === tab ? colors.primary : colors.textSecondary,
              borderBottom: activeTab === tab ? `3px solid ${colors.primary}` : 'none',
              cursor: 'pointer', textTransform: 'capitalize'
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* PRODUCTS TABLE */}
        {activeTab === 'products' && (
          <div style={{ background: colors.surface, borderRadius: '16px', overflow: 'hidden', boxShadow: `0 4px 12px ${colors.shadow}`, border: `1px solid ${colors.border}` }}>
            <div style={{ padding: '1.5rem', borderBottom: `1px solid ${colors.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontWeight: 'bold', color: colors.text }}>Product List</h2>
              <button onClick={handleCreateProduct} style={{
                background: colors.primary, color: '#fff', border: 'none', padding: '10px 20px',
                borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <FaPlus /> Create
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: colors.surfaceLight }}>
                  <tr>
                    {['ID', 'Name', 'Price', 'Category', 'Stock', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: colors.textSecondary, fontWeight: '600' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productState.products.map(product => (
                    <tr key={product._id} style={{ borderBottom: `1px solid ${colors.divider}` }}>
                      <td style={{ padding: '1rem', color: colors.text }}>{product._id.substring(0, 6)}...</td>
                      <td style={{ padding: '1rem', color: colors.text, fontWeight: '500' }}>{product.name}</td>
                      <td style={{ padding: '1rem', color: colors.text }}>₹{product.price}</td>
                      <td style={{ padding: '1rem', color: colors.textSecondary }}>{product.category}</td>
                      <td style={{ padding: '1rem', color: colors.text }}>{product.countInStock}</td>
                      <td style={{ padding: '1rem' }}>
                        <Link to={`/admin/product/${product._id}/edit`} style={{ color: colors.primary, marginRight: '1rem' }}><FaEdit /></Link>
                        <button onClick={() => handleDeleteProduct(product._id)} style={{ color: colors.error, background: 'transparent', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div style={{ background: colors.surface, borderRadius: '16px', overflow: 'hidden', boxShadow: `0 4px 12px ${colors.shadow}`, border: `1px solid ${colors.border}` }}>
            <div style={{ padding: '1.5rem', borderBottom: `1px solid ${colors.divider}` }}>
              <h2 style={{ fontWeight: 'bold', color: colors.text }}>All Orders</h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: colors.surfaceLight }}>
                  <tr>
                    {['ID', 'User', 'Date', 'Total', 'Paid', 'Delivered', 'Action'].map(h => (
                      <th key={h} style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: colors.textSecondary, fontWeight: '600' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orderState.orders.map(order => (
                    <tr key={order._id} style={{ borderBottom: `1px solid ${colors.divider}` }}>
                      <td style={{ padding: '1rem', color: colors.text }}>{order._id.substring(0, 6)}...</td>
                      <td style={{ padding: '1rem', color: colors.text }}>{order.user?.name || 'Deleted User'}</td>
                      <td style={{ padding: '1rem', color: colors.textSecondary }}>{order.createdAt.substring(0, 10)}</td>
                      <td style={{ padding: '1rem', color: colors.text }}>₹{order.totalPrice}</td>
                      <td style={{ padding: '1rem', color: order.isPaid ? colors.success : colors.error, fontWeight: '600' }}>
                        {order.isPaid ? 'Paid' : 'Not Paid'}
                      </td>
                      <td style={{ padding: '1rem', color: order.isDelivered ? colors.success : colors.warning, fontWeight: '600' }}>
                        {order.isDelivered ? 'Delivered' : 'Pending'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <Link to={`/order/${order._id}`} style={{ padding: '6px 12px', background: colors.primary, color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem' }}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;