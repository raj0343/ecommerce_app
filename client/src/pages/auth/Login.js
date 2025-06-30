// import React, { useState } from 'react'
// import axios from 'axios'
// import Layout from '../../components/layout/layout'
// import toast from 'react-hot-toast';
// import {useNavigate}from 'react-router-dom'
// import { useAuth } from '../../context/auth';


// const Login = () => {
    
//       const [email, setEmail] = useState("")
//       const [password, setPassword] = useState("")
//       const [auth,setAuth]=useAuth



//       const navigate=useNavigate()
    
//         const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res=await axios.post('/api/v1/auth/login',
//         {email,password})
//         if(res.data.success){
//           toast.success(res.data.message)
//           setAuth({
//             ...auth,
//             user:res.data.token,
//             token:res.data.token
//           })
//           navigate('/')
//         }else{
//           toast.error(res.data.message)
//         }
//     } catch (error) {
//       console.log(error)
//       toast.error('somthing went wrong')
//     }
//   }



//   return (
//     <>
      

//  <Layout title="Login Page">
//       <div className='register'>
//         <div className="register-form">
//           <h2>Login Your Account</h2>
//           <form onSubmit={handleSubmit}>
            

//             <div className="mb-3">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-control"
//                 placeholder='Enter Your Email'
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-control"
//                 placeholder='Enter Your Password'
//                 required
//               />
//             </div>

           

//             <button type="submit" className="btn btn-primary w-100">Login</button>
//           </form>
//         </div>
//       </div>
//     </Layout>


//     </>
//   )
// }

// export default Login



























import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/layout';
import toast from 'react-hot-toast';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ This should be a function call, not a reference
  const [auth, setAuth] = useAuth();
  const location=useLocation()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });
      if (res.data.success) {
        toast.success(res.data.message);
        
        // ✅ Save auth to context
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });

        // ✅ Save auth to localStorage (for persistence)
        localStorage.setItem("auth", JSON.stringify({
          user: res.data.user,
          token: res.data.token
        }));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Login Page" >
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
          <h2>Login Your Account</h2>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
                required
              />
            </div>
            


            <div className='mb-3'>
              <button type="submit" className="btn btn-primary w-100">Login</button>

            </div>
                      <button type="submit" className="btn btn-primary w-100" onClick={()=>{
                          navigate('/forgot-password')
                        }}>Forgot Password</button>
      

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
