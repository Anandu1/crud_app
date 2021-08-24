const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
    foodName:{
        type:String,
        required:true
    },
    days:{
        type:String,
        required:true
    }
});
const Food = mongoose.model("Food",foodSchema);
module.exports=Food;