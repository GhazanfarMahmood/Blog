import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "mern-blog/categories",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const uploadCategoryImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default uploadCategoryImage;