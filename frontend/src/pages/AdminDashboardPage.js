import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus, FaBox, FaShoppingBag } from 'react-icons/fa';
import { getProducts, deleteProduct, createProduct } from '../store/slices/productSlice';
import { getOrders } from '../store/slices/orderSlice';
import { toast } from 'react-toastify';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Products</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{productState.products.length}</h2>
            </div>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '1.5rem' }}>
              <FaBox />
            </div>
          </div>
          
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Orders</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{orderState.orders.length}</h2>
            </div>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '1.5rem' }}>
              <FaShoppingBag />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-group">
          {['products', 'orders'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* PRODUCTS TABLE */}
        {activeTab === 'products' && (
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Product List</h2>
              <button onClick={handleCreateProduct} className="btn-primary" style={{ width: 'auto', padding: '10px 20px', gap: '8px' }}>
                <FaPlus /> Create
              </button>
            </div>
            <div className="table-container">
              <table className="styled-table">
                <thead style={{ background: 'var(--surface-light)' }}>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productState.products.map(product => (
                    <tr key={product._id}>
                      <td>{product._id.substring(0, 6)}...</td>
                      <td style={{ fontWeight: '500' }}>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{product.category}</td>
                      <td>{product.countInStock}</td>
                      <td>
                        <Link to={`/admin/product/${product._id}/edit`} style={{ color: 'var(--primary)', marginRight: '1rem' }}><FaEdit /></Link>
                        <button onClick={() => handleDeleteProduct(product._id)} style={{ color: 'var(--error)', background: 'transparent', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
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
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>All Orders</h2>
            </div>
            <div className="table-container">
              <table className="styled-table">
                <thead style={{ background: 'var(--surface-light)' }}>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderState.orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 6)}...</td>
                      <td>{order.user?.name || 'Deleted User'}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{order.createdAt.substring(0, 10)}</td>
                      <td>₹{order.totalPrice}</td>
                      <td>
                        <span className={`badge ${order.isPaid ? 'badge-success' : 'badge-danger'}`}>
                          {order.isPaid ? 'Paid' : 'Not Paid'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${order.isDelivered ? 'badge-success' : 'badge-warning'}`}>
                          {order.isDelivered ? 'Delivered' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem', width: 'auto', display: 'inline-block' }}>View</Link>
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