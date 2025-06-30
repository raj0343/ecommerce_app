import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Policy from "./pages/Policy.js"
import PagenotFound from "./pages/PagenotFound.js";
import Register from "./pages/auth/Register.js";
  import { ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/auth/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPassword from "./pages/auth/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Users from "./pages/Admin/Users.js";
import Orders from "./pages/user/Orders.js";
import Profile from "./pages/user/Profile.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./pages/Search.js";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path='/' element={<HomePage/>}/>
//         <Route path='/register' element={<Register/>}/>
//         <Route path='/about' element={<About/>}/>
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/policy' element={<Policy/>}/>
//         <Route path='*' element={<PagenotFound/>}/>
//       </Routes>
//     </>
//   );
// }


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<Search />} />

        <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />

        
        <Route path="/dashboard" element={<PrivateRoute/>}>
           <Route path='user' element={<Dashboard />} />
            <Route path='user/orders' element={<Orders />} />
            <Route path='user/profile' element={<Profile />} />


        </Route>


          <Route path="/dashboard" element={<AdminRoute/>}>
           <Route path='admin' element={<AdminDashboard />} />
           <Route path='admin/create-category' element={<CreateCategory />} />
           <Route path='admin/create-product' element={<CreateProduct />} />
                      <Route path='admin/product/:slug' element={<UpdateProduct/>} />

            <Route path='admin/products' element={<Products />} />

           <Route path='admin/users' element={<Users />} />
        </Route>




        
         <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PagenotFound />} />
      </Routes>

      {/* ✅ Add this to render toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default App;
