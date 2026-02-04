export const googleAuthSuccess = (req, res) => {
  res.redirect("http://localhost:5173/dashboard");
};

export const googleAuthFailure = (req, res) => {
  res.status(401).json({
    success: false,
    message: "Google authentication failed",
  });
};

// POST /api/auth/logout
export const logout = (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("sessionId"); // or connect.sid
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
};

export const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
};
