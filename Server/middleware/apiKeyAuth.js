// middleware/apiKeyAuth.js
const PfUser = require("../model/user");

const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) return res.status(401).json({ message: "API key missing" });

  const user = await PfUser.findOne({ apiKey });
  if (!user) return res.status(403).json({ message: "Invalid API key" });

  req.user = { id: user._id, role: user.role }; // Attach user to request
  next();
};

module.exports = apiKeyAuth;
