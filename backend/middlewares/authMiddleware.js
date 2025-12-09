import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.club = { id: decoded.id }; // assuming your token has club id as payload
    next();
  } catch (error) {
   
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
