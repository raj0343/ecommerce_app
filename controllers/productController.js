import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'

// export const createProductController=async(req,res)=>{
//         try {
//             const {name,slug,description,price,category,quantity,shipping}=req.fields
//             const {photo}=req.files
//             //validation
//             switch(true){
//                 case !name:
//                     return res.status(500).send({error:'name is required'})
//                         case !description:
//                             return res.status(500).send({error:'description is required'})
//                             case !price:
//                                 return res.status(500).send({error:'price is required'})
//                                 case !category:
//                                     return res.status(500).send({error:'category is required'})
//                                     case !quantity:
//                                         return res.status(500).send({error:'quantity is required'})
//                                             case photo && photo.size>100000:
//                                                 return res.status(500).send({error:'photo size is too large'})
//             }
//             const products=new productModel({...req.fields,slug:slugify(name)})
//             if(photo){
//                 products.photo.data=fs.readFileSync(photo.path)
//                 products.photo.contentType=photo.type
//             }
//             await products.save()
//             res.status(202).send({
//                 success:true,
//                 message:'Product Created',
//                 products
//             })
//         } catch (error) {
//             console.log(error)
//             res.status(500).send({
//                 success:false,
//                 message:'error creating the product',
//                 error
//             })
            
//         }
// }

export const createProductController = async (req, res) => {
  try {
    console.log("🔥 Incoming fields:", req.fields);
    console.log("🔥 Incoming files:", req.files);

    const { name, slug, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: 'name is required' });
      case !description:
        return res.status(500).send({ error: 'description is required' });
      case !price:
        return res.status(500).send({ error: 'price is required' });
      case !category:
        return res.status(500).send({ error: 'category is required' });
      case !quantity:
        return res.status(500).send({ error: 'quantity is required' });
      case photo && photo.size > 1024 * 1024:
        return res.status(500).send({ error: 'photo size is too large (Max 1MB)' });
    }

    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
      shipping: shipping === "1", // ✅ Boolean conversion
    });

    if (photo && photo.path) {
      try {
        console.log("📂 Reading image:", photo.path);
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      } catch (err) {
        console.error("🛑 File read failed:", err.message);
        return res.status(500).send({ success: false, error: "File read failed" });
      }
    }

    await products.save();

    res.status(202).send({
      success: true,
      message: 'Product Created',
      products
    });
  } catch (error) {
    console.error("🔥 Create Product Error:", error.message);
    res.status(500).send({
      success: false,
      message: 'error creating the product',
      error: error.message
    });
  }
};





///get all products
export const getProductController=async (req,res)=>{
    try {
        const products= await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:'all products',
            products
            
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error getting products',
            error:error.message
        })
    }
}

/////////lorem
//////single product not created
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "❌ Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "✅ Fetched single product",
      product,
    });
  } catch (error) {
    console.log("🔥 getSingleProduct error:", error);
    res.status(500).send({
      success: false,
      message: "🚫 Error getting single product",
      error: error.message,
    });
  }
};


///get photo
export const productPhotoController=async (req,res)=>
    {
        try {
            const product=await productModel.findById(req.params.pid).select("photo")
            if(product.photo.data)
                {
                    res.set('Content-type',product.photo.contentType)
                    return res.status(200).send(product.photo.data)
                    }
                
                           
                            } catch (error) {
                                console.log(error)
                                res.status(500).send({
                                    success:false,
                                    message:'error getting photo',
                                    error:error.message
                                    })
                                    }
                                }



///delete product
export const deleteProductController=async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'product deleted',
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error deleting product',
            error
        })

    }
}



//update product
export const updateProductController=async (req,res)=>{
    try {
            const {name,description,price,category,quantity,shipping}=req.fields
            const {photo}=req.files
            //validation
            switch(true){
                case !name:
                    return res.status(500).send({error:'name is required'})
                        case !description:
                            return res.status(500).send({error:'description is required'})
                            case !price:
                                return res.status(500).send({error:'price is required'})
                                case !category:
                                    return res.status(500).send({error:'category is required'})
                                    case !quantity:
                                        return res.status(500).send({error:'quantity is required'})
                                            case photo && photo.size>1024*1024:
                                                return res.status(500).send({error:'photo size is too large'})
            }
            const products=await productModel.findByIdAndUpdate(req.params.pid,
                {...req.fields,slug:slugify(name)},{new:true}
            )
            if (photo && photo.path) {
  try {
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
  } catch (readErr) {
    console.error("Photo read error:", readErr);
    return res.status(500).send({ success: false, error: "Failed to read photo file" });
  }
}

            await products.save()
            res.status(202).send({
                success:true,
                message:'Product Updated',
                products
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'error updating the product',
                error
            })
            
        }
}


///filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error filtering products",
      error: error.message,
    });
  }
};
