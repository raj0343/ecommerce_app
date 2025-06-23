import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';



//proctected routes token base
export const requireSignIn= async (req,res,next)=>{
    try {
        const decode=JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error)
    }
}


//admin access
export const isAdmin=async(req,res,next)=>{
    try {
        const user=await userModel.findById(req.user._id);
        if(user.role!==1){
            return res.status(403).json({message:'Admin access only'})
            }
            else{
                next()
            }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message:'Admin access only',
            success:false,
            error
        })
    }
}