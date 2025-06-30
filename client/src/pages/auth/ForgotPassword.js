import Layout from '../../components/layout/layout'
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';





const ForgotPassword = () => {




                 const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/forgot-password', { email, newPassword ,answer});
      if (res.data.success) {
        toast.success(res.data.message);
        
        

        // ✅ Save auth to localStorage (for persistence)
       

        navigate( "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };














  return (
    <Layout title={"Ecommerce app"}>
                <div className="register"
      
      
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
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Your Email"
                required
              />
            </div>




             <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                placeholder="What is yours pet name"
                required
              />
            </div>




            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
                required
              />
            </div>
            


            <div className='mb-3'>
              <button type="submit" className="btn btn-primary w-100">Reset</button>

            </div>
                     
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword
