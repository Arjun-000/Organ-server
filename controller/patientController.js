const patients = require('../model/patientModel');
const users = require("../model/userModel"); 


// exports.addPatientController = async(req,res)=>{
//     console.log("Inside addPatientController");
//     const userId = req.userId
//     const {name,phone,organ,blood,type,status} = req.body
//     console.log(name,phone,organ,blood,type,status);
//     try{
//         const newPatient = await patients({name,phone,organ,blood,type,userId:req.userId,status:"Pending"})
//         await newPatient.save()
//         res.status(200).json(newPatient)
//     }
//     catch(err){
//         res.status(401).json(err)
//     }
// }

exports.addPatientController = async (req, res) => {
    console.log("Inside addPatientController");

    const userId = req.userId || null; // ✅ Allows both logged-in and guest users
    const { name, phone, organ, blood, type, donorId } = req.body;

    try {
        const newPatient = new patients({
            name,
            phone,
            organ,
            blood,
            type,
            userId : userId, // Will be null if not logged in
            status: "Pending",
            donorId: donorId || null,
        });

        await newPatient.save();
        res.status(200).json(newPatient);
    } catch (err) {
        console.error("Error adding patient:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};



exports.getAllPatientsComponent = async(req,res)=>{
    console.log("Inside getAllPatientsComponent...");
    try{
        const patient = await patients.find()
        res.status(200).json(patient)
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.editPatientController = async (req, res) => {
    console.log("Inside Edit Patient...");
    const patientId = req.params.id; // Get ID from URL params
    const { name, blood, organ, phone, email, type, status } = req.body;

    try {
        const updatedPatient = await patients.findByIdAndUpdate(
            patientId, // Find patient by ID
            { name, blood, organ, phone, email, type, status }, // Fields to update
            { new: true } // Return updated document
        );

        if (!updatedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        res.status(200).json(updatedPatient);
    } catch (err) {
        console.error("Error updating patient:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.removePatientController = async(req,res)=>{
    const patientId = req.params.id
    try{
        const deletePatient = await patients.findByIdAndDelete({_id:patientId})
        res.status(200).json(deletePatient)
    }
    catch(err){
        res.status(401).json(err)
    }
}
