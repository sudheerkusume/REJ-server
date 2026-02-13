// const jwt = require("jsonwebtoken");

// const adminAuth = (req, res, next) => {
//     const token = req.header("x-token");
//     if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, "jsonSecret");
//         req.userId = decoded.user.id;
//         next();
//     } catch {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

// module.exports = adminAuth;
