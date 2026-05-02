const authService = require("./auth.services");
const statusCodes = require("../utils/statusCodes");

const registerController = async (req, res) => {
  try {
    const response = await authService.register(req.body);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.log(error);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const response = await authService.login(req.body);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};