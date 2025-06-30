import React ,{useState,useEffect}from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])

  //get all pro
  const getAllProducts=async()=>{
    try {
      const{data}=await axios.get('/api/v1/product/get-product')
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      toast.error('Somthing went wrong')
    }
  }

  //lifecycle
  useEffect(() =>
    {
      getAllProducts()
      }, [] 
      )
  return (
    <Layout>
    <div>
     <div className="row">
  <div className="col-md-3">
    <AdminMenu />
  </div>

  <div className="col-md-9">
    <h1 className="text-center">All Products</h1>

    {/* ✅ Flex container outside the map */}
    <div className="d-flex flex-wrap justify-content-start">
      {products?.map(p => (
        <Link
          to={`/dashboard/admin/product/${p.slug}`}
          key={p._id}
          style={{ textDecoration: "none", color: "inherit" }}
          className="product-link"
        >
          <div className="card m-3" style={{ width: "18rem" }}>
            <img
              src={`/api/v1/product/product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>

    </div>
    </Layout>
  )
}

export default Products
