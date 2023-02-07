import express from "express";
import multer from "multer" //multer is required for file upload
import fs  from'fs-extra'
import path from 'path';
import FileController from "../controllers/FileController.js";
const __dirname = path.resolve();
const userRouter = express.Router();
const uploadPath = path.join(__dirname, "..", "/server/uploads");
fs.ensureDirSync(uploadPath); // sure that path is exiting or not 
const storage = multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cb) {
      try{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
      }catch(err){
        console.log("e0rror")
      }
    }
  })
const upload =multer({storage:storage})
userRouter.post('/singleFileUpload',upload.single("files"), FileController.createSingleFile)


export default userRouter;
