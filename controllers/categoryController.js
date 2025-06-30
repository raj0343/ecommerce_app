import slugify from "slugify"
import CategoryModel from "../models/CategoryModel.js"

export const createCategoryController=async (req,res)=>{
        try {
            const {name}=req.body
            if(!name){
                return res.status(400).send({message:"Please enter a category name"})
            }
            const existingCategory=await CategoryModel.findOne({name})
            if(existingCategory){
                return res.status(200).send({message:"Category already exists"})
                }
                const category=await new CategoryModel({
                    name,slug:slugify(name)

                }).save()
                res.status(201).send({
                    message:"Category created successfully",
                    success:true,
                    category
                })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Error creating category",
                success:false,
                error
            })
        }
}




export const updateCategoryController=async(req,res)=>{
            try {
                const {name}=req.body
                const {id}=req.params
                const category=await CategoryModel.findByIdAndUpdate(
                    id,{name,slug:slugify(name)},{new:true}
                )
                res.status(200).send({
                    message:"Category updated successfully",
                    success:true,
                    category
                })
            } catch (error) {
                console.log(error)
                res.status(500).send({
                    message: "Error updating category",
                    success:false,
                    error
                    })
            }
}



///get all cate
export const categoryController=async(req,res)=>
    {
        try {
            const category=await CategoryModel.find({})
            res.status(200).send({
                message:"Categories retrieved successfully",
                success:true,
                category
                })
                } catch (error) {
                    console.log(error)
                    res.status(500).send({
                        message: "Error retrieving categories",
                        success:false,
                        error
                        })
                    }
                }



////single category
export const singleCategoryController=async(req,res)=>
    {
        try {
            const category=await CategoryModel.findOne({slug:req.params.slug})
            if(!category)
                {
                    res.status(404).send({
                        message:"Category not found",
                        success:false
                        })
                        }
                        res.status(200).send({
                            message:"Category retrieved successfully",
                            success:true,
                            category
                            })
                            } catch (error) {
                                console.log(error)
                                res.status(500).send({
                                    message: "Error retrieving category",
                                    success:false,
                                    error
                                    })
                                    }
                                    }


                                    //delete category
                                    export const deleteCategoryController=async(req,res)=>
                                        {
                                            try{
                                                const category=await CategoryModel.findByIdAndDelete(req.params.id)
                                                if(!category)
                                                    {
                                                        res.status(404).send({
                                                            message:"Category not found",
                                                            success:false
                                                            })
                                                            }
                                                            res.status(200).send({
                                                                message:"Category deleted successfully",
                                                                success:true
                                                                })
                                                                } catch (error) {
                                                                    console.log(error)
                                                                    res.status(500).send({
                                                                        message: "Error deleting category",
                                                                        success:false,
                                                                        error
                                                     })
                                                 }

                                            }
