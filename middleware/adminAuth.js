const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "adminSecret123");

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

console.log("ADMIN AUTH MIDDLEWARE HIT");

module.exports = adminAuth;
