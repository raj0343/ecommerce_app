import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select}from 'antd'
import { useNavigate } from 'react-router-dom';


const {Option}=Select




const CreateProduct = () => {
    const navigate=useNavigate()
    const [categories, setCategories] = useState([])
    const [photo,setPhoto] = useState('')
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')



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
const handleCreate = async (e) => {
  e.preventDefault();
  try {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
productData.append("price", Number(price));      
productData.append("category", category);
    productData.append("quantity", Number(quantity)); // ✅ convert to number
    productData.append("photo", photo);
    productData.append("shipping", shipping);

    const { data } = await axios.post(
      "/api/v1/product/create-product",
      productData
    );

    if (data?.success) {
      toast.success("Product created successfully!");
      navigate("/dashboard/admin/products");
    } else {
      toast.error(data?.message || "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to create product");
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
                        Products
                    </h1>
                    <div className='m-1'>
                        <Select  placeholder="Select Category" size='large' showSearch className='form-select mb-3 ' onChange={(value)=>{setCategory(value)}}>
                            {categories?.map(c=>(
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}

                        </Select>
                        <div className='mb-3'>
                            <label className='btn btn-outline-secondary col-md-12'>
                                {photo?photo.name:"Upload photo"} 
                                    <input type='file' name='photo' accept='image/* 'onChange={(e)=>setPhoto(e.target.files[0])}
                                    hidden/>
                            </label>

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
                                onChange={(value) => setShipping(value)} // ✅ Correct
                                >

                                <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                            </Select>
                            
                        </div>

                        <div className='mb-3'>
                            <button className='btn btn-primary' onClick={handleCreate}> Create Product </button>

                        </div>
                    </div>
                </div>


            </div>
    </Layout>
  )
}

export default CreateProduct
