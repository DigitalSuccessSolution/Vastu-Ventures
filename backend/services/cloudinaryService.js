import cloudinary from "../config/cloudinary.js";

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} fileBuffer - The file buffer from Multer
 * @param {string} folder - Cloudinary folder path (e.g. "vastuvidya/avatars")
 * @param {string} resourceType - "image", "raw" (for PDFs), or "video"
 * @returns {{ url: string, publicId: string }}
 */
export const uploadToCloudinary = (fileBuffer, folder, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(fileBuffer);
  });
};

/**
 * Delete a file from Cloudinary by public ID.
 * @param {string} publicId
 * @param {string} resourceType
 */
export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error(`❌ Cloudinary delete failed: ${error.message}`);
  }
};
