import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import  JWT from "jsonwebtoken"



export const registerController=async (req,res)=>{
    try {
        const {Name,Email,Password,Phone,Address}=req.body
        //validation
        if(!Name){
            return res.status(400).send({message:"name is required"})
        }
        if(!Email){
            return res.status(400).send({message:"email is required"})
            }
            if(!Password){
                return res.status(400).send({message:"password is required"})
                }
                if(!Phone){
                    return res.status(400).send({message:"phone is required"})
                    }
                    if(!Address){
                        return res.status(400).send({message:"address is required"})
                        }


                        //check existing user
                        const existingUser=await userModel.findOne({Email})
                        if(existingUser){
                            return res.status(400).send({message:"user already exists"})
                            }

                            //register user
                            const hashedPassword= await hashPassword(Password)
                            //save
                            const user= await new userModel({Name,Email,Phone,Address,Password:hashedPassword}).save()
                            res.status(201).send({message:"user created successfully",user})

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error registering user",
            success:false
        })
    }
}




///login post
export const loginController=async (req,res)=>{
    try {
        const {Email,Password}=req.body
        //validation
        if(!Email || !Password){
            return res.status(400).send({
                message:"email and password are required",
                success:false
            })
        }
        //check existing user
        const user=await userModel.findOne({Email})
        //validation
        if(!user){
            return res.status(400).send({
                message:"user does not exist",
                success:false
                })
                }
        const match= await comparePassword(Password,user.Password)
        //validation
        if(!match){
            return res.status(200).send({
                message:"invalid password",
                success:false
                })
                }

         //token
         const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",})

         res.status(200).send({
            message:"login successful",
            success:true,
            user:{
                Name:user.Name,
                Email:user.Email,
                Phone:user.Phone,
                Address:user.Address,
            },
            token,
         })


        

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error logging in user",
            success:false,
            error
        })
    }
}




//test controller
export const testController=(req,res)=>{
    res.send("procted routes")
}