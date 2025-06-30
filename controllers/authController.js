import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// ==============================
// @route   POST /register
// ==============================
export const registerController = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body); // Debug log

    const { name, email, password, phone, address,answer } = req.body;

    // Input validations
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "All fields are required (name, email, password, phone, address,answer)"
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save new user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    // Response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    console.error("REGISTRATION ERROR:", error.message);
    res.status(500).send({
      success: false,
      message: "Error registering user",
      error: error.message
    });
  }
};

// ==============================
// @route   POST /login
// ==============================
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate JWT Token
    const token = JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Successful login response
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).send({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
};



//forgot password controlletr
export const forgotPasswordController=async (req,res)=>{
    try {
      const {email,answer,newPassword}=req.body
      if(!email){
        return res.status(400).send({success:false,message:"Email is required"})
      }
      if(!answer){
        return res.status(400).send({success:false,message:"Answer is required"})
        }
        if(!newPassword){
          return res.status(400).send({success:false,message:"New password is required"})
          }
          const user= await userModel.findOne({email,answer})
          if(!user){
            return res.status(400).send({success:false,message:"Invalid email or answer"})
            }
            const hashed=await hashPassword(newPassword)
            await userModel.findByIdAndUpdate(user._id,{password:hashed})
            res.status(200).send({success:true,message:"Password updated successfully"})
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: "Somthing Went Wrong",
        error
      })
    }
}




// ==============================
// @route   GET /test
// ==============================
export const testController = (req, res) => {
  res.send("Protected route access successful");
};
