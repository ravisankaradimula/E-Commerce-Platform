import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Make sure the 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetype = file.mimetype;

  const extname = path.extname(file.originalname).toLowerCase();
  if (filetypes.test(extname) && filetypes.test(mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, .png, .webp files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path.replace(/\\/g, "/")}`, // Normalize path for all OS
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
