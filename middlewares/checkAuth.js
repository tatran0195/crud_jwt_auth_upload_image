const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token provided.",
            error: error,
        });
    }
}

module.exports = {
    checkAuth,
};
