import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/slices/productSlice';
import { FaArrowRight, FaStar, FaHeart, FaShoppingCart, FaGem, FaUsers, FaShieldAlt, FaTruck } from 'react-icons/fa';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
  const featuredProducts = products.slice(0, 6);

  const features = [
    {
      icon: <FaGem className="text-3xl text-primary-500" />,
      title: "Handcrafted Excellence",
      description: "Each piece is carefully crafted by skilled artisans with years of experience."
    },
    {
      icon: <FaUsers className="text-3xl text-secondary-500" />,
      title: "Support Local Artisans",
      description: "Your purchase directly supports local craftsmen and their families."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-warning-500" />,
      title: "Quality Guaranteed",
      description: "Every product comes with our quality assurance and satisfaction guarantee."
    },
    {
      icon: <FaTruck className="text-3xl text-success-500" />,
      title: "Fast Delivery",
      description: "Quick and secure delivery across India with real-time tracking."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-surface-0 to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center py-20 gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Discover
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  Handcrafted
                </span>
                Excellence
              </h1>
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Explore our curated collection of unique, handmade crafts from talented artisans across India. 
                Each piece tells a story of tradition, skill, and passion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group"
                >
                  Explore Products
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/about"
                  className="btn-outline text-lg px-8 py-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-elevation-4 mb-4">
                      <FaGem className="text-white text-3xl" />
                    </div>
                    <p className="text-neutral-600 font-medium">Artisan's Corner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface-0">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Artisan's Corner?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We're committed to bringing you the finest handmade crafts while supporting local artisans and preserving traditional craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-transform duration-300">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-surface-1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover our handpicked selection of the finest handmade crafts from talented artisans.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="card loading">
                  <div className="h-48 bg-surface-2 rounded-lg mb-4"></div>
                  <div className="h-4 bg-surface-2 rounded mb-2"></div>
                  <div className="h-4 bg-surface-2 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-surface-2 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="card group">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="p-2 bg-surface-0/80 backdrop-blur-sm rounded-full hover:bg-surface-0 transition-colors duration-200">
                        <FaHeart className="text-neutral-400 hover:text-error-500 transition-colors duration-200" />
                      </button>
                    </div>
                    {product.countInStock === 0 && (
                      <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(product.rating || 0)
                                ? 'text-warning-500'
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-500">
                        ({product.numReviews || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{product.price}
                      </span>
                      <Link
                        to={`/product/${product._id}`}
                        className="btn-primary text-sm px-4 py-2 inline-flex items-center gap-2"
                      >
                        <FaShoppingCart />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-outline text-lg px-8 py-4 inline-flex items-center gap-2 group"
            >
              View All Products
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Discover Amazing Handcrafted Products?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of customers who trust Artisan's Corner for unique, high-quality handmade crafts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary-600 hover:bg-surface-1 font-semibold px-8 py-4 rounded-xl transition-all duration-200 inline-flex items-center gap-2 group"
              >
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/products"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl transition-all duration-200"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
