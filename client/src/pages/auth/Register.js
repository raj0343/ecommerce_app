import React, { useState } from 'react'
import axios from 'axios'
import Layout from '../../components/layout/layout'
import toast from 'react-hot-toast';
import {useNavigate}from 'react-router-dom'


const Register = () => {
  // useState
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
    const [ address, setAddress] = useState("")

  const [answer, setAnswer] = useState("")
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res=await axios.post('/api/v1/auth/register',
        {name,email,password,phone,address,answer})
        if(res.data.success){
          toast.success(res.data.message)
          navigate('/login')
        }else{
          toast.error(res.data.message)
        }
    } catch (error) {
      console.log(error)
      toast.error('somthing went wrong')
    }
  }

  return (
    <Layout title="Register Page">
      <div className='register'     
      
      
      style={{
    backgroundImage: " url('/images/bg2.avif')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    fontFamily: "'Poppins', sans-serif"
  }}
      
      
      
      
      
      >
        <div className="register-form">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder='Enter Your Name'
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder='Enter Your Email'
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder='Enter Your Password'
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder='Phone Number'
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder='Address'
                required
              />
            </div>



          <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                placeholder='What is your pet name ???'
                required
              />
            </div>











            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register
