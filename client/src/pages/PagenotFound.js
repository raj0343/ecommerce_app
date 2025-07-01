import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCartPlus, FaTrashAlt } from 'react-icons/fa';

const PageNotFound = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Fetch categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("❌ Error fetching categories", error);
    }
  };

  // Fetch products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log("❌ Error fetching products", error);
    }
  };

  // Add to cart
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove from cart
  const removeFromCart = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  return (
    <Layout title="Category + Cart View">
      <div className="container mt-4">
        <h1 className="text-center mb-4">Products in your Cart 🛒</h1>

        {/* Categories Section */}
        <h2 className="text-center mt-4 mb-3">📂 Categories</h2>
        <div className="row mb-5">
          {categories.map((c) => (
            <div key={c._id} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">📁 {c.name}</h5>
                  <Link to={`/category/${c.slug}`} className="btn btn-outline-primary mt-2">
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <h2 className="text-center mb-4">🛒 Products</h2>
        <div className="row">
          {products.map((p) => (
            <div key={p._id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <p className="card-text fw-bold">₹ {p.price}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/product/${p.slug}`} className="btn btn-sm btn-info">
                      More Info
                    </Link>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => addToCart(p)}
                    >
                      <FaCartPlus className="me-1" /> Add 🛒
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <h2 className="text-center mt-5 mb-4">🧺 Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">🕳️ Your cart is empty.</p>
        ) : (
          <div className="row">
            {cart.map((item) => (
              <div key={item._id} className="col-md-4 mb-3">
                <div className="card shadow-sm">
                  <img
                    src={`/api/v1/product/product-photo/${item._id}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text fw-bold">₹ {item.price}</p>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <FaTrashAlt /> Remove ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PageNotFound;
