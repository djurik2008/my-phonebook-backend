import multer from "multer";
import path from "path";
import slugify from "slugify";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${slugify(file.originalname, {
      lower: true,
    })}_${uniquePrefix}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop();

  if (extention === "exe") {
    return cb(HttpError(400, "Extention .exe  not allow"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
