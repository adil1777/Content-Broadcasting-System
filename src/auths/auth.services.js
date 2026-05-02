const userModel = require("../models/userModel");
const messages = require("../utils/messages");
const statusCodes = require("../utils/statusCodes");
const jwt = require("jsonwebtoken");
const serverConfig = require("../config/configServer");

const register = async ({ name, email, password}) => {
  const existingUser = await userModel.getUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      message: messages.USER_EXISTS,
      statusCode: statusCodes.OK,
    };
  }

  await userModel.createUser(name, email, password);

  return {
    success: true,
    message: messages.REGISTER_SUCCESS,
    statusCode: statusCodes.CREATED,
  };
};

const login = async ({ email, password }) => {
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    return {
      success: false,
      message: messages.USER_NOT_FOUND,
      statusCode: statusCodes.NOT_FOUND,
    };
  }

  const passwordMatch = await userModel.comparePassword(
    password,
    user.password_hash
  );

  if (!passwordMatch) {
    return {
      success: false,
      message: messages.INVALID_CREDENTIALS,
      statusCode: statusCodes.UNAUTHORIZED,
    };
  }
  
  const token = jwt.sign({ id: user.id, role: user.role }, serverConfig.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    success: true,
    message: messages.LOGIN_SUCCESS,
    token,
    user,
    statusCode: statusCodes.OK,
  };
};

module.exports = {
  register,
  login,
};