let express=require("express");
let app=express();
let dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 5000;
const userRoutes=require("./Routes/userRoutes");
const productRoutes=require("./Routes/productRoutes")
const cartRoutes=require("./Routes/CartRoutes")
const upload = require("./middleware/uploads");
const connectDB = require('./config/db');

connectDB()

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("API is running");
});


app.use("/uploads", express.static("uploads"));
app.use("/user",userRoutes);
app.use("/product",productRoutes)
app.use("/cart",cartRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})