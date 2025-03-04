const mongoose = require("mongoose")

const donorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    organ:{
        type:String,
        required:true
    },
    blood:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        default:"Pending"
    }
})

const donors = mongoose.model("donors",donorSchema)
module.exports = donors