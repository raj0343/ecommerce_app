import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoController, searchProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router =express.Router()


router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)




////get products
router.get('/get-product',getProductController)




////get photo
router.get('/product-photo/:pid', productPhotoController); // ✅ NO `.getPhoto`



//delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)


//single product
router.get('/get-product/:slug', getSingleProductController)


//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//filter products
router.post('/product-filters', productFiltersController)


//count producr
router.get('/product-count',productCountController)



///product per page
router.get('/product-list/:page',productListController)


//search product
router.get('/search/:keyword',searchProductController)
export default router