export default function isAdmin(req, res, next) {
  if (req.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
}
