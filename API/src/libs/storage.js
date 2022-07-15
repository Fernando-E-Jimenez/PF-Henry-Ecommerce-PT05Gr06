const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CLAUDINARY_CLOUD_NAME, CLAUDINARY_API_KEY, CLAUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLAUDINARY_CLOUD_NAME,
  api_key: CLAUDINARY_API_KEY,
  api_secret: CLAUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AppVinos",
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|png|gif|jpeg/;
    const mimetype = filetypes.test(file.mimetype);
    const extmane = filetypes.test(path.extname(file.originalname));
    if (mimetype && extmane) return cb(null, true);
    return cb(
      new Error("Error: Fomato invalido (permitidos; JPG, PNG, GIF y JPEG)."),
      false
    );
  },
  limits: { fileSize: 3000000 },
});

module.exports = { upload, cloudinary };
