const donors = require("../model/donorModel")

exports.addDonorController = async (req, res) => {
    console.log("Inside add donor");
    console.log("Headers received:", req.headers);
    const userId=req.userId
    console.log("User ID extracted:", req.userId);

    if (!req.userId) {
        return res.status(401).json("Authorization Failed: User ID missing");
    }

    const { name,phone,organ,blood,type,status } = req.body;
    if (!name || !email || !phone || !organ || !type || !blood ) {
        return res.status(400).json("Missing required donor fields");
    }

    try {
        const newDonor = new donors({ name, email, phone, organ, type, blood,status:"Pending", userId: req.userId });
        await newDonor.save();
        res.status(200).json(newDonor);
    } catch (err) {
        res.status(500).json("Error adding donor: " + err.message);
    }
};

exports.getDonorController = async (req,res)=>{
    console.log("Inside getDonorController");
    console.log("Fetching all donor");
    try{
        const donor = await donors.find()
        res.status(200).json(donor)

    }
    catch(err){
        res.status(401).json(err)
    }
    
}

exports.editDonorController = async (req, res) => {
    console.log("Inside edit donor controller");
    console.log("Received ID:", req.params.id); // Debugging log
    console.log("Received Body:", req.body); // Debugging log
    console.log(req.userRole);
    
    const donorId = req.params.id;
    const { name, blood, organ, phone, email, type, status } = req.body;

    // Check if the user making the request is an admin
    // if (req.userRole !== "admin") {
    //     return res.status(403).json({ error: "Access denied. Admins only." });
    // }

    try {
        const updatedDonor = await donors.findByIdAndUpdate(
            donorId, 
            { name, blood, organ, phone, email, type, status }, 
            { new: true } // Ensures it returns the updated document
        );
        

        if (!updatedDonor) {
            return res.status(404).json({ error: "Donor not found" });
        }

        res.status(200).json(updatedDonor);
    } catch (err) {
        res.status(500).json({ error: "Error updating donor: " + err.message });
    }
};





exports.removeDonorController = async(req,res)=>{
    console.log("Inside removeDonorController");
    const donorId = req.params.id
    try{
        const deleteDonor = await donors.findByIdAndDelete({_id:donorId})
        res.status(200).json(deleteDonor)
    }catch(err){
        res.status(401).json(err)
    }
    
}