import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params : (req, file) => {
        return {
            folder : "mern-blog",
            allowed_formats : ["jpg", "jpeg", "png", "webp"],
            public_id: file.originalname.split(".")[0],
        }
    }
});

const upload = multer({ storage });

export default upload;