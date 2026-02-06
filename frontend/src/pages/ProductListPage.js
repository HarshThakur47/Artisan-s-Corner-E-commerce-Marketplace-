import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaStar, FaFilter, FaSearch } from 'react-icons/fa';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name': default: return a.name.localeCompare(b.name);
      }
    });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) setSearchParams({ search: searchTerm });
    else setSearchParams({});
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
    setSearchParams({});
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e8e4dc',
      paddingTop: '100px',
      paddingBottom: '80px'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h1>
          <p className="text-gray-600">Discover unique handmade crafts from Indian artisans</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm">
            <form onSubmit={handleSearch} className="flex-1 w-full max-w-md relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary inline-flex items-center">
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white rounded-xl shadow-sm animation-slide-down">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded-lg">
                    {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All' : cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full p-2 border rounded-lg">
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={clearFilters} className="btn-outline w-full py-2">Clear Filters</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No products found</h3>
            <button onClick={clearFilters} className="mt-4 btn-primary">Clear Filters</button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            padding: '1rem 0'
          }}>
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textDecoration: 'none',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ overflow: 'hidden', borderRadius: '12px', marginBottom: '1rem', height: '250px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#2c2c2c', marginBottom: '0.5rem' }}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2c2c2c', margin: 0 }}>
                    ₹{product.price}
                  </p>
                  <div className="flex items-center text-yellow-400 text-sm">
                    <FaStar className="mr-1" /> {product.rating}
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