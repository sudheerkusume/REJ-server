const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Login required" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded; // { id, role }
        next();
    });
};

module.exports = auth;
