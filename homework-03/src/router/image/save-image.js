const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const imageRouter = express.Router();

const TEMP_PATH_FOLDER = path.join(__dirname, "../../db/tmp");
const USER_PATH_FOLDER = path.join(__dirname, "../../db/users");

const isValidUser = (req, res) => {
  const userId = req.body.userId;

  const newUserPath = path.join(USER_PATH_FOLDER + "/", userId);

  if (!fs.existsSync(newUserPath)) {
    res.set("Content-type", "application/json");
    res.status(400);
    res.json({ status: "no user" });
    return;
  }
};

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, TEMP_PATH_FOLDER);
  },

  filename: (req, file, next) => {
    next(null, file.originalname);
  }
});
const upload = multer({ storage });

const saveImages = (req, res, next) => {
  isValidUser(req, res);
  const fileObject = req.file;
  const userId = req.body.userId;
  const newTempPath = path.join(TEMP_PATH_FOLDER + "/",fileObject.originalname);
  const newUserPath = path.join(USER_PATH_FOLDER + "/", userId +'/'+ fileObject.originalname);
    console.log("newTempPath" + newUserPath);
  const src = fs.createReadStream(TEMP_PATH_FOLDER);
  const dest = fs.createWriteStream(newUserPath);

  src.pipe(dest);
  src.on("end", (req, res) => {
    res.set("Content-type", "application/json");
    res.status(200);
    res.json({ status: `was saved in user ${userId}` });
  });
};

const type = upload.single("file");

imageRouter.post("/", type, saveImages);

module.exports = imageRouter;
