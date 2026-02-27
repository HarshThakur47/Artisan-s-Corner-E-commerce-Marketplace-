import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../store/slices/productSlice';
import { FaStar, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

const ProductListPage = () => {
  const dispatch = useDispatch();
  
  // Safety checks
  const productState = useSelector((state) => state.product) || {};
  const { products = [], isLoading } = productState;
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { 
    dispatch(getProducts()); 
  }, [dispatch]);

  // FIX: Scroll to top whenever the URL parameters (like category) change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchTerm(searchParams.get('search') || '');
    
    // Automatically scroll to the very top of the page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'all' || product.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  const updateURL = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '600' }}>Our Collection</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Discover unique handmade crafts</p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-wrapper" style={{ flex: 1 }}>
              <FaSearch className="input-icon" />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); updateURL('search', e.target.value); }}
              />
            </div>
            <button className="btn-outline" onClick={() => setShowFilters(!showFilters)} style={{ padding: '12px 20px' }}>
              <FaFilter /> Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="glass-card animate-fade-in" style={{ marginTop: '1rem', padding: '2rem' }}>
              <div className="grid-3">
                <div>
                  <label className="form-label">Category</label>
                  <select 
                    className="input-field" 
                    value={selectedCategory} 
                    onChange={(e) => { setSelectedCategory(e.target.value); updateURL('category', e.target.value); }}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Sort By</label>
                  <select className="input-field" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low)</option>
                    <option value="price-high">Price (High)</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button className="btn-outline" onClick={() => { setSearchParams({}); setSelectedCategory('all'); setSearchTerm(''); }} style={{ width: '100%', justifyContent: 'center' }}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? <p>Loading...</p> : (
          <div className="grid-4">
            {filteredProducts.map(product => (
              <Link key={product._id} to={`/product/${product._id}`} className="glass-card" style={{ padding: '1.5rem', textDecoration: 'none', display: 'block' }}>
                <div className="img-zoom-container" style={{ height: '220px', marginBottom: '1rem' }}>
                  <img src={product.image} alt={product.name} className="img-zoom" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>₹{product.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                    <FaStar size={14} /> <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{product.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;