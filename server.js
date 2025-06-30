import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from './routes/auth.js'
import categoryRoutes from "./routes/CategoryRoutes.js"
import productRoutes from './routes/productRoutes.js'
import cors from "cors"


dotenv.config()

//db config
connectDB()


const app= express()

//morgan and middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

app.get('/',(req,res)=>{
    res.send({
        message:'welcome'
    })
})


const PORT= process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})