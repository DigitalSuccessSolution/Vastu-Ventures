import { verifyAccessToken } from "../utils/generateToken.js";
import User from "../modules/users/user.model.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

/**
 * Middleware: Verify JWT access token and attach user to req.
 */
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: ERROR_MESSAGES.UNAUTHORIZED });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id).select("-password -refreshToken -emailVerificationOTP");
    if (!user) {
      return res.status(401).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    if (user.isBlocked) {
      return res.status(403).json({ success: false, message: ERROR_MESSAGES.ACCOUNT_BLOCKED });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: ERROR_MESSAGES.UNAUTHORIZED });
  }
};

export default isAuthenticated;
