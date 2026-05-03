const contentModel = require("../models/contentModel");
const { CONTENT_STATUS } = require("../utils/enum");
const messages = require("../utils/messages");
const statusCodes = require("../utils/statusCodes");

const uploadContent = async ({
  title,
  subject,
  description,
  start_time,
  end_time,
  file,
  userId
}) => {
  
  // 🔹 Validation
  if (!title || !subject || !file) {
    return {
      success: false,
      message: "Missing required fields",
      statusCode: statusCodes.BAD_REQUEST
    };
  }

  // 🔹 Prepare payload
  const payload = {
    title,
    subject,
    description: description || null,
    file_path: file.path,
    file_type: file.mimetype,
    file_size: file.size,
    uploaded_by: userId,
    start_time: start_time || null,
    end_time: end_time || null
  };

  // 🔹 Save to DB
  await contentModel.createContent(payload);

  return {
    success: true,
    message: "Content uploaded successfully",
    statusCode: statusCodes.CREATED
  };
};

//GET ALL CONTENTS 
const getAllContent = async () => {
  try{
      const response = await contentModel.getAllContent();
      return {
        success: true,
        message: messages.CONTENT_FETCHED,
        response,
        statusCode: statusCodes.OK,
      };

  }catch(err){
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  }
  
};

// GET ALL PENDING CONTENT 
const getPendingContent = async () => {
  try{
      const response = await contentModel.getContentByStatus(CONTENT_STATUS.PENDING);
      return {
        success: true,
        message: messages.PENDING_CONTENT_FETCHED,
        response,
        statusCode: statusCodes.OK,
      };

  }catch(err){
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  }
  
};

// UPDATE CONTENT STATUS TO  APPROVED
const approveContent = async (contentId, principalId) => {
   try{
      await contentModel.updateContentStatus(contentId, {
        status: CONTENT_STATUS.APPROVED,
        approved_by: principalId,
        approved_at: new Date()
      });

      return {
       success: true,
       message: messages.CONTENT_APPROVED,
       statusCode: statusCodes.OK
      };

   }catch(err){
     return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
   }
};

// UPDATE CONTENT STATUS TO  REJECTED
const rejectContent = async (contentId, principalId, reason) => {
   try{
      if (!reason) {
        return {
          success: false,
          message: messages.REJECTION_REASON_REQUIRED,
          statusCode: statusCodes.BAD_REQUEST
        };
      }

    await contentModel.updateContentStatus(contentId, {
      status: CONTENT_STATUS.REJECTED,
      approved_by: principalId,
      rejection_reason: reason
    });

    return {
     success: true,
     message: messages.CONTENT_REJECTED,
     statusCode: statusCodes.OK
    };

   }catch(err){
     return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
   }
};

module.exports = {
  uploadContent,
  getAllContent,
  getPendingContent,
  approveContent,
  rejectContent
};