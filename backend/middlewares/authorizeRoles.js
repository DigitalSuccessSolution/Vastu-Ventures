import { ERROR_MESSAGES } from "../constants/errorMessages.js";

/**
 * Middleware factory: Restrict access to specific roles.
 * Usage: authorizeRoles("admin", "instructor")
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: ERROR_MESSAGES.FORBIDDEN });
    }
    next();
  };
};

export default authorizeRoles;
