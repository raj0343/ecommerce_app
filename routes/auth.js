import express from 'express';
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import {
  isAdmin,
  requireSignIn
} from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Register route
router.post('/register', registerController);

// ✅ Login route (only one controller!)
router.post('/login', loginController);


//forgot password
router.post('/forgot-password',forgotPasswordController);

// ✅ Test route (protected + admin-only)
router.get('/test', requireSignIn, isAdmin, testController);

//protected route
router.get('/user-auth',requireSignIn,(req,res)=>{
  res.status(200).send({ok:true})
})

///protected auth for admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
})

export default router;
