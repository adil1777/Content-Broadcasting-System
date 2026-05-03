const messages = require("../utils/messages");
const statusCodes = require("../utils/statusCodes");

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        success: false,
        message: messages.UNAUTHORIZED,
      });
    }

    if (!req.user.role) {
      return res.status(statusCodes.FORBIDDEN).json({
        success: false,
        message: messages.ROLE_NOT_ASSIGNED,
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(statusCodes.FORBIDDEN).json({
        success: false,
        message: messages.ACCESS_DENIED,
      });
    }

    next();
  };
};

module.exports = roleMiddleware;