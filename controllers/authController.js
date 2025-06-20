import userModel from "../models/userModel.js"
import { hashPassword } from "../helpers/authHelper.js"



export const registerController=async (req,res)=>{
    try {
        const {name,email,password,phone,address}=req.body
        //validation
        if(!name){
            return res.status(400).send({message:"name is required"})
        }
        if(!email){
            return res.status(400).send({message:"email is required"})
            }
            if(!password){
                return res.status(400).send({message:"password is required"})
                }
                if(!phone){
                    return res.status(400).send({message:"phone is required"})
                    }
                    if(!address){
                        return res.status(400).send({message:"address is required"})
                        }


                        //check existing user
                        const existingUser=await userModel.findOne({email})
                        if(existingUser){
                            return res.status(400).send({message:"user already exists"})
                            }

                            //register user
                            const hashedPassword= await hashPassword(password)
                            //save
                            const user= new userModel({name,email,phone,address,password:hashedPassword}).save()
                            res.status(201).send({message:"user created successfully",user})

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error registering user",
            success:false
        })
    }
}