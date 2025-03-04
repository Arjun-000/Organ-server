const admin = require("../model/hosptialModel")
const jwt = require('jsonwebtoken')

exports.adminLoginController = async (req, res) => {
    console.log("Inside Admin Login Controller");
    const { hEmail, password } = req.body;

    try {
        const adminNow = await admin.findOne({ hEmail, password });

        console.log("Admin Found:", adminNow); // Debugging

        if (!adminNow) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: adminNow._id, userRole:"admin" }, process.env.JWTPASSWORD);
        res.status(200).json({ admin: adminNow, token });
    } catch (err) {
        console.error("Error in Admin Login:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
