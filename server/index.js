const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const foodModel = require("./models/Food")
app.use(express.json());
app.use(cors());
const CONNECTION_URL = "mongodb+srv://anandu:10231616@cluster0.nhhsj.mongodb.net/mydb?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true,useUnifiedTopology:true
},
console.log("Database Connected")
);
app.post('/insert',async(req,res)=>{
    const foodName = req.body.foodName
    const days = req.body.days
const food = new foodModel({
    foodName:foodName,
    days:days
});
try {
    await food.save();
    console.log(`Food saved ${food}`)
} catch (error) {
    console.log(error)
}
});
app.put('/update',async(req,res)=>{
    const newFoodName = req.body.newfoodName
    const id = req.body.id
try {
  await foodModel.findById(id,(error,updatedFood)=>{
       updatedFood.foodName=newFoodName
       updatedFood.save();
       res.send("Update")
   })
} catch (error) {
    console.log(error)
}
});
app.delete("/delete/:id",async (req,res)=>{
const id = req.params.id;
await foodModel.findByIdAndRemove(id).exec()
})
app.get("/read",async(req,res)=>{
    foodModel.find({},(error,result)=>{
if(error){
    res.send(error)
}
res.send(result);
    })
})
app.listen(3001,()=>{
    console.log("Server running on port 3001..");
})