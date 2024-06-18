const authentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  return res.status(401).json({
    success: false,
    message: "User not authenticated",
  });
};

export { authentication };
