const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification error:", err.message);
            return res.status(401).json({ message: "Token is invalid or expired" });
        }
        req.user = user;
        next();
    });
}
module.exports = {
    authenticateToken,
};