const  mongoose=require("mongoose");

const connectDB=async()=>{
    try {

     await mongoose.connect(process.env.DB_URI, 
        {useNewUrlParser: true,
             useUnifiedTopology: true
            });
       console.log("data base is connected")
        
    } catch (error) {

        console.log("data base can not connected")
    }
}

module.exports=connectDB;