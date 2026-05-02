const contentModel = require("../models/contentModel");
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

module.exports = {
  uploadContent
};