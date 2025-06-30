import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices.js';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle category checkbox
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Filter products by category and price
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log("Filter error:", error);
    }
  };

  // Fetch categories and all products on first mount
  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, []);

  // Trigger filter when category or price changes
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  return (
    <Layout title={'All Products - Best offers Available'}>
      <div className='row m-3 mt-4'>
        {/* ===== Left Filter Panel ===== */}
        <div className='col-md-3'>
          {/* Category Filter */}
          <div>
            <h5 className='text-center'>Filter By Categories</h5>
            <div className='d-flex flex-column' style={{ gap: '8px', marginTop: '10px' }}>
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  style={{ padding: '4px' }}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className='mt-4'>
            <h5 className='text-center mt-1'>Filter By Price</h5>
            <div className='d-flex flex-column' style={{ marginTop: '10px' }}>
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                {Prices?.map((p) => (
                  <Radio value={p.array} key={p._id} style={{ padding: '4px' }}>
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>

        {/* ===== Right Product Panel ===== */}
        <div className='col-md-9'>
          <h1 className='text-center mb-4'>All Products</h1>
          <div className='row'>
            {products?.map((p) => (
              <div className='col-md-4 mb-4' key={p._id}>
                <div className='card h-100'>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className='card-img-top'
                    alt={p.name}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className='card-body d-flex flex-column justify-content-between'>
                    <div>
                      <h5 className='card-title'>{p.name}</h5>
                      <p className='card-text'>{p.description.substring(0, 40)}...</p>
                      <p className='card-text fw-bold'>₹{p.price}</p>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <button className='btn btn-primary w-100'>More Details</button>
                      <button className='btn btn-secondary w-100'>Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
