import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../store/slices/productSlice';
import { useTheme } from '../context/ThemeContext';
import { FaStar, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const { colors } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 1. Initialize state from URL params
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // 2. NEW: Listen for URL changes (e.g. clicking Home Page links)
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const searchFromUrl = searchParams.get('search');

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory('all');
    }

    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product => {
      // Safe check for product name/desc to prevent crashes if data is missing
      const name = product.name ? product.name.toLowerCase() : '';
      const desc = product.description ? product.description.toLowerCase() : '';
      const term = searchTerm.toLowerCase();

      const matchesSearch = name.includes(term) || desc.includes(term);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'name': default: return a.name.localeCompare(b.name);
      }
    });

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL when searching
    const params = {};
    if (searchTerm.trim()) params.search = searchTerm;
    if (selectedCategory !== 'all') params.category = selectedCategory;
    setSearchParams(params);
  };

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);
    
    // Update URL when changing category via dropdown
    const params = {};
    if (searchTerm.trim()) params.search = searchTerm;
    if (newCat !== 'all') params.category = newCat;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
    setSearchParams({}); // Clear URL params
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      paddingTop: '100px',
      paddingBottom: '80px',
      transition: 'background 0.3s ease'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.5rem',
            letterSpacing: '-0.5px'
          }}>
            Our Collection
          </h1>
          <p style={{ fontSize: '1.125rem', color: colors.textSecondary }}>
            Discover unique handmade crafts from Indian artisans
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search Form */}
            <form 
              onSubmit={handleSearch}
              style={{
                width: '100%',
                maxWidth: '600px',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'relative',
                background: colors.surface,
                borderRadius: '12px',
                boxShadow: `0 4px 12px ${colors.shadow}`,
                border: `1px solid ${colors.border}`,
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.textSecondary
                }}>
                  <FaSearch size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 48px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '15px',
                    background: 'transparent',
                    color: colors.text
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${colors.shadow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filters Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              style={{
                background: `linear-gradient(135deg, ${colors.secondary}dd, ${colors.secondary})`,
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 12px ${colors.shadow}`
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <FaFilter /> Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div style={{
              marginTop: '1.5rem',
              padding: '2rem',
              background: colors.surface,
              borderRadius: '16px',
              boxShadow: `0 8px 24px ${colors.shadow}`,
              border: `1px solid ${colors.border}`,
              animation: 'slideDown 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: colors.text }}>
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: colors.textSecondary,
                    padding: '8px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.hover}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                {/* Category Filter */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: colors.text
                  }}>
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange} // Updated handler
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${colors.border}`,
                      borderRadius: '10px',
                      fontSize: '14px',
                      background: colors.surface,
                      color: colors.text,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.primary}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: colors.text
                  }}>
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${colors.border}`,
                      borderRadius: '10px',
                      fontSize: '14px',
                      background: colors.surface,
                      color: colors.text,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.primary}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    onClick={clearFilters}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'transparent',
                      border: `2px solid ${colors.border}`,
                      borderRadius: '10px',
                      color: colors.text,
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.hover;
                      e.currentTarget.style.borderColor = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = colors.border;
                    }}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Count */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '15px', color: colors.textSecondary, textAlign: 'center' }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            {selectedCategory !== 'all' && <span style={{ fontWeight: '600', marginLeft: '5px' }}>in {selectedCategory}</span>}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  background: colors.surface,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: `1px solid ${colors.border}`
                }}
              >
                <div style={{
                  height: '250px',
                  background: colors.surfaceLight,
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <div style={{
                  height: '20px',
                  background: colors.surfaceLight,
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <div style={{
                  height: '20px',
                  background: colors.surfaceLight,
                  borderRadius: '4px',
                  width: '60%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: colors.surface,
            borderRadius: '16px',
            border: `1px solid ${colors.border}`
          }}>
            <p style={{ fontSize: '1.125rem', color: colors.textSecondary, marginBottom: '1rem' }}>
              No products found
            </p>
            <button
              onClick={clearFilters}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                style={{
                  background: colors.surface,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textDecoration: 'none',
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 2px 8px ${colors.shadow}`,
                  position: 'relative',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 16px 32px ${colors.shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 2px 8px ${colors.shadow}`;
                }}
              >
                {/* Product Image */}
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  height: '250px',
                  background: colors.surfaceLight
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Product Info */}
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating !== undefined && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={14}
                          color={i < Math.floor(product.rating) ? '#c97d3f' : colors.border}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                      {product.rating.toFixed(1)} ({product.numReviews || 0})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: colors.primary,
                    margin: 0
                  }}>
                    ₹{product.price}
                  </p>
                  {product.countInStock === 0 && (
                    <span style={{
                      fontSize: '0.875rem',
                      color: colors.error,
                      fontWeight: '600'
                    }}>
                      Out of Stock
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ProductListPage;