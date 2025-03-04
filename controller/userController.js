const users = require('../model/userModel')
const donors = require("../model/donorModel");
const patients = require("../model/patientModel");
const Jwt = require('jsonwebtoken')

exports.registerController = async (req, res) => {
    console.log("inside register");

    const { name,age,phone,blood,email,password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json("User already exist.....Please login")
        } else {
            const newUser = new users({
                name,
                age,
                phone,
                blood,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.loginController = async (req, res) => {
    console.log("Inside login");
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email,password });

        if (existingUser) {
            const token = Jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD);
            res.status(200).json({ users: existingUser, token });
            // return res.status(404).json("User not found");
        }
        else{
            // return res.status(403).json("Incorrect password");
            return res.status(404).json("User not found");
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
};
exports.editUser = async (req, res) => {
    console.log("Inside edit user..........");

    const { name, age, phone, blood, email } = req.body;
    const userId = req.params.id;  // Extract ID from params

    try {
        const updateUser = await users.findByIdAndUpdate(
            { _id: userId }, 
            { $set: { name, age, phone, blood, email } }, 
            { new: true }
        );
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(401).json(err);
    }
};


exports.getUserActivity = async (req, res) => {
    console.log("Fetching user donations and requests");
    
    const userId = req.params.id;
    
    try {
        const user = await users.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userDonations = await donors.find({ userId: userId });
        const userRequests = await patients.find({ userId: userId });

        res.status(200).json({ user, donations: userDonations, requests: userRequests });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

