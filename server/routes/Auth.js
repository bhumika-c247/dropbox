
import express from "express";
import AuthController from "../controllers/AuthController.js";
import FileController from "../controllers/FileController.js";
import { validateToken } from "../middlewares/auth.js";
import { handleValidationErrors }  from "../middlewares/validation.js";
import { LoginValidation } from "../validators/auth.js";
import multer from "multer" //multer is required for file upload
import fs  from'fs-extra'
import path from 'path';
const __dirname = path.resolve();
const authRouter = express.Router();

authRouter.post("/login",LoginValidation, handleValidationErrors,AuthController.login )


// route for file upload
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
authRouter.post('/upload',upload.array("file"), FileController.createFile)
authRouter.post('/deleteFile', FileController.deleteFile)
authRouter.post('/getAllFile', FileController.getAllfile)






export default authRouter;