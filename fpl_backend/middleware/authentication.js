// check if the user is authenticated/logged in

const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

const authentication = (req, res, next) => {
    const token = req.headers.authorization || req.cookies.fplreloaded_login;

    if (!token){
        console.log("no token (auth middleware)")
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("error with token (auth middleware)")
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = authentication;