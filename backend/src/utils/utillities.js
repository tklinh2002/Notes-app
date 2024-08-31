//this is a middleware to authenticate the token
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
  const token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Forbidden",
        error: err.name,
        details: err.message,
        user: user // Include user information in the response
      });
    }
    req.user = user.user;
    console.log("req.user:", req.user);
    // Attach user information to the response headers
    next();
  });
};
