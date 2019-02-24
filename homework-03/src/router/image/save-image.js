const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const imageRouter = express.Router();

const TEMP_PATH_FOLDER = path.join(__dirname, "../../db/tmp");
const USER_PATH_FOLDER = path.join(__dirname, "../../db/users");

const rename = util.promisify(fs.rename);

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

// const copy = async (srcPath, dstPath) => {
//   const readStream = fs.createReadStream(srcPath);
//   const writeStream = fs.createWriteStream(dstPath);

//   readStream.on("error", function(err) {
//     console.error(err);
//   });
//   writeStream.on("error", function(err) {
//     console.error(err);
//   });

//   readStream.on("close", function() {
//     fs.unlink(srcPath, function(err) {
//       if (err) console.error(err);
//     });
//   });

//   readStream.pipe(writeStream);
// };

const response = (res, userId) => {
  res.set("Content-type", "application/json");
  res.status(200);
  res.json({ status: `was saved in user ${userId}` });
};

const moveImage = (src, dst) => {
  return rename(src, dst).catch(error => console.log(error));
};

const saveImages = (req, res, next) => {
  isValidUser(req, res);
  const fileObject = req.file;
  const userId = req.body.userId;

  const newTempPath = path.join(TEMP_PATH_FOLDER, "/", fileObject.originalname);

  const newUserPath = path.join(
    USER_PATH_FOLDER,
    "/",
    userId,
   
  );

  moveImage(newTempPath, newUserPath).then(response(res, userId));
};

const type = upload.single("file");

imageRouter.post("/", type, saveImages);

module.exports = imageRouter;
