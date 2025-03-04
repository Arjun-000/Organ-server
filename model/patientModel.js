const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    name:{
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
       
    },
    donorId:{
        type: String, 
        required: false
    }
})

const patients = mongoose.model("patients",patientSchema)
module.exports = patients