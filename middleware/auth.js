import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"
  if (!token) {
    return res.status(401).json({ error: "Please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // store only the user ID
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
