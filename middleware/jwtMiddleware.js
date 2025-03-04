const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
    console.log("Inside Middleware");

    if (!req.headers["authorization"]) {
        return res.status(401).json({ error: "Authorization Failed... Token is Missing!" });
    }

    const tokenParts = req.headers["authorization"].split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ error: "Authorization Failed... Invalid Token Format!" });
    }

    const token = tokenParts[1];

    try {
        const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
        console.log("JWT Decoded:", jwtResponse);

        req.userId = jwtResponse.userId; // ✅ Extract user ID
        //req.userRole = jwtResponse.userRole; // ✅ Extract userRole (now available in JWT)

        next();
    } catch (error) {
        return res.status(401).json({ error: "Authorization Failed... Invalid Token!" });
    }
};

module.exports = jwtMiddleware;
