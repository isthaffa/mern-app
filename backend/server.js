const express=require("express");
const cors=require("cors");
const mongoose =require("mongoose");



// require("dotenv").config({path:'.env'});

const app=express();
const port=process.env.PORT||5000;

app.use(cors());
app.use(express.json());


// const uri=process.env.ATLAS_URI;
mongoose.connect(`mongodb://localhost:27017/server`,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true })
.then(()=>{
    console.log("connected to mongodb");
    
})

// const connection=mongoose.connection;

// connection.once('open',()=>{
//     console.log('mongodb  successfully started');
    
// })

const exerciseRouter=require("./routes/exercises");
const userRouter=require("./routes/users");

app.use("/exercises",exerciseRouter);
app.use("/users",userRouter);



app.get("/", (req, res) => {
    res.json({ message: "Welcome to  application." });
  });
  


app.listen(port,()=>{
console.log(`server running in port ${port}`);
    

});

