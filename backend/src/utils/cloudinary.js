const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
require("dotenv").config();

// Set your Cloudinary credentials
const cloudinaryCredentials = {
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
};

cloudinary.config({
  cloud_name: cloudinaryCredentials.cloudName,
  api_key: cloudinaryCredentials.apiKey,
  api_secret: cloudinaryCredentials.apiSecret,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "hotelImages",
    });
    // console.log(res.secure_url);
    fs.unlinkSync(localFilePath);
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);

    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const res = await cloudinary.uploader.destroy(publicId);
    console.log(res);
    return true;
  } catch (error) {
    console.log("Failed to delete", error);
    return error;
  }
};

const deleteArrayOfImagesFromCloudinary = async (publicIds) => {
  try {
    if (!Array.isArray(publicIds) || publicIds.length === 0) {
      console.log("No publicIds provided for deletion.");
      return null;
    }

    const deletionResults = await Promise.all(
      publicIds.map(async (publicId) => await deleteFromCloudinary(publicId))
    );

    // Log deletion results
    console.log("Deletion results:", deletionResults);

    // Check if all deletions were successful
    const allDeletionsSuccessful = deletionResults.every(
      (result) => result === true
    );

    return allDeletionsSuccessful;
  } catch (error) {
    console.log("Failed to delete array of images", error);
    return false;
  }
};

const extractPublicIds = (imageUrls) => {
  const publicIds = [];

  imageUrls.forEach((imageUrl) => {
    const publicIdMatch = imageUrl.match(/\/v\d+\/(.+?)\.\w+$/);
    if (publicIdMatch) {
      publicIds.push(publicIdMatch[1]);
    } else {
      // Handle the case where the URL format is invalid
      console.error(`Invalid secure URL format for image: ${imageUrl}`);
    }
  });

  return publicIds;
};

module.exports = {
  uploadCloudinary,
  deleteArrayOfImagesFromCloudinary,
  extractPublicIds,
};
