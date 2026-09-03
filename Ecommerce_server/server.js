let express=require("express");
let app=express();
const cors = require('cors');
let dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 5000;
const userRoutes=require("./Routes/userRoutes");
const productRoutes=require("./Routes/productRoutes")
const cartRoutes=require("./Routes/CartRoutes")
const upload = require("./middleware/uploads");
const category=require("./Routes/categoryRoutes")
const brandRoutes=require("./Routes/brandRoutes")
const order=require("./Routes/orderRoutes")
const connectDB = require('./config/db');

connectDB()

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("API is running");
});


app.use("/uploads", express.static("uploads"));
app.use("/user",userRoutes);
app.use("/product",productRoutes)
app.use("/cart",cartRoutes)
app.use("/category",category)
app.use("/brand",brandRoutes)
app.use("/order",order)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})