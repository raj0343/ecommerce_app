import React,{useState,useEffect } from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select}from 'antd'
import { useNavigate,useParams } from 'react-router-dom';

const {Option}=Select



const UpdateProduct = () => {

                 const navigate=useNavigate()
                 const params =useParams()
    const [categories, setCategories] = useState([])
    const [photo,setPhoto] = useState('')
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const [id,setId]=useState("")


////get single products
const getSingleProduct = async () => {
  try {
    const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
    if (data?.success) {
      const product = data.product;
      setName(product.name);
      setId(data.product._id)
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setCategory(product.category._id); // assuming category is an object
      setShipping(product.shipping ? "1" : "0");
    } else {
      toast.error("Failed to load product details");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while fetching the product");
  }
};
useEffect(() =>
  {
    getSingleProduct()
    }, []);







////get all category
 const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);







////craete product
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
productData.append("price", Number(price));      
productData.append("category", category);
    productData.append("quantity", Number(quantity)); // ✅ convert to number
    photo && productData.append("photo", photo);
    productData.append("shipping", shipping);

    const { data } = await axios.put(
      `/api/v1/product/update-product/${id}`,
      productData
    );

    if (data?.success) {
      toast.success("Product updated successfully!");
      navigate('/dashboard/admin/products')
    } else {
      toast.error(data?.message || "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to update the  product");
  }
};


////delete products
const handleDelete = async (e) =>
  {
    let answer =window.prompt("are you really want to delete the product ??")
    if(!answer)return
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
        );
        if (data?.success) {
          toast.success("Product deleted successfully!");
          navigate('/dashboard/admin/products')
          } else {
            toast.error(data?.message || "Something went wrong");
            }
            } catch (error) {
              console.log(error);
              toast.error("Failed to delete the product");
              }
              };









  return (






     <Layout title={"Create-Product"}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9 p-3'>
                    <h1>
                        Update Products
                    </h1>
                    <div className='m-1'>
                        <Select  placeholder="Select Category" size='large' showSearch className='form-select mb-3 ' onChange={(value)=>{setCategory(value)}} value={category}>
                            {categories?.map(c=>(
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}

                        </Select>
                        

                          <div className='mb-3'>
                            {photo ?(
                              <div className='text-center'>
                                <img
                                src={URL.createObjectURL(photo)}
                                alt="uploaded image"
                                height={"200px"}
                                className='img img-responsive'
                                
                                />

                              </div>
                            ):(
                              <div className='text-center'>
                                <img
                                src={`/api/v1/product/product-photo/${id}`}
                                alt="uploaded image"
                                height={"200px"}
                                className='img img-responsive'
                                
                                />

                              </div>
                            )}

                          </div>







                        <div className='mb-3'>
                            <input type='text' value={name} placeholder='write the name' className='form-control'
                            onChange={(e)=>setName(e.target.value)}></input>
                        </div>


                        <div className='mb-3'>
                            <input type='text' value={description} placeholder='write the description' className='form-control'
                            onChange={(e)=>setDescription(e.target.value)}></input>
                        </div>




                         <div className='mb-3'>
                            <input type='number' value={price} placeholder='write the price' className='form-control'
                            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}></input>
                        </div>




                         <div className='mb-3'>
                            <input type='number' value={quantity} placeholder='write the Quantity' className='form-control'
                            onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}></input>
                        </div>




                         <div className='mb-3'>
                            <Select
                                variant="borderless"
                                value={shipping}
                                placeholder="Select Shipping"
                                className="form-control mb-3"
                                showSearch
                                onChange={(value) => setShipping(value)} 
                                
                                >

                                <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                            </Select>
                            
                        </div>

                        <div className='mb-3'>
                            <button className='btn btn-primary' onClick={handleUpdate}> Update Product </button>

                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-danger' onClick={handleDelete}> Delete Product </button>

                        </div>
                    </div>
                </div>


            </div>
    </Layout>








  )
}

export default UpdateProduct
