const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const CSVController = require("../controller/CSVController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/CSVFiles"); // Use an absolute path
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder is created, including parent directories
    }
    cb(null, uploadPath); // Save files to the "uploads/csv" directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save the file with its original name
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      "text/csv",
      "application/vnd.ms-excel", // XLS
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new Error("Only CSV, XLSX, and XLS files are allowed!"),
        false
      );
    }
    callback(null, true);
  },
});

router.post(
  "/uploadCSVFile",
  upload.single("file"),
  CSVController.uploadCSVFile
);

router.post("/deleteCSVFile", CSVController.deleteCSVFile);

module.exports = router;
