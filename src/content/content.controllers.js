const contentService = require("./content.services");
const statusCodes = require("../utils/statusCodes");

const uploadContentController = async (req, res) => {
  try {
    
    const response = await contentService.uploadContent({
      ...req.body,
      file: req.file,
      userId: req.user.id
    });

    return res.status(response.statusCode).json(response);

  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  uploadContentController
};