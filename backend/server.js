import express from 'express'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleWare.js'
dotenv.config()
const app=express()


app.use('/api/products',productRoutes)

app.use(notFound)
app.use(errorHandler)

app.get('/',(req,res) => {
    res.send("api is running....")
})


const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow))