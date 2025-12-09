export const isHeadAdmin = (req, res, next) => {
  if (req.user?.role !== "headadmin") {
    return res.status(403).json({ message: "Access denied: Head admin only" });
  }
  next();
};
