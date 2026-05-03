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

//GET ALL CONTENT
const getAllContentController = async (req, res) => {
  try{
     const response = await contentService.getAllContent();
     return res.status(response.statusCode).json(response);

  }catch(err){
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  }
};

// GET ALL PENDING CONTENT
const getPendingContentController = async (req, res) => {
  try{
      const response = await contentService.getPendingContent();
      res.status(response.statusCode).json(response);
  }catch(err){
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  }
};

// GET ALL APPROVED  CONTENT
const approveContentController = async (req, res) => {
   try{
      const response = await contentService.approveContent(req.params.id,req.user.id );

      res.status(response.statusCode).json(response);

   }catch(err){
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
   }
};

// GET ALL REJECT CONTENT
const rejectContentController = async (req, res) => {
  try{
      const { reason } = req.body;

      if (!reason) {
        return {
        success: false,
        message: messages.REJECTED_REASON_REQUIRED,
        statusCode: statusCodes.BAD_REQUEST,
      };
  }

      const response = await contentService.rejectContent(req.params.id, req.user.id, reason);

      res.status(response.statusCode).json(response);

  }catch(err){
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  uploadContentController,
  getAllContentController,
  getPendingContentController,
  approveContentController,
  rejectContentController
};
