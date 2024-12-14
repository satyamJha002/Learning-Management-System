export const checkAdminRole = (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error while checking role" });
  }
};
