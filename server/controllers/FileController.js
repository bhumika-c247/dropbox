import mongoose from "mongoose";
import users from "../models/users.js";
const createFile = async (req, res) => {
  const { files } = req;
  const { userId } = req.body;
  const multifile = [];
  files.forEach((ele) => {
    multifile.push({
      name: ele.name,
      path: ele.webkitRelativePath,
      size: ele.size,
      type: ele.type,
    });
  });
  try {
    const data = await users.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          userfiles: { $each: multifile },
        },
      },
      { new: true }
    );
    res.json({ data: data, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createSingleFile = async (req, res) => {
  const { file } = req;
  const { userId } = req.body;
  try {
    const data = await users.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          userfiles: {
            name: file.originalname,
            path: file.filename,
            size: file.size,
            type: file.mimetype,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json({ data: data, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteFile = async (req, res) => {
  const { userId, fileId } = req.body;

  try {
    const deletedData = await users.findOneAndUpdate(
      { _id: userId },
      { $pull: { userfiles: { _id: fileId } } },
      { new: true }
    );
    res.json({ data: deletedData, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllfile = async (req, res) => {
  const { userId } = req.body;
  try {
    const allFiles = await users.find({ _id: userId });

    const getAllFiles = await users.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(userId) },
      },
      {
        "$unwind": "$userfiles"
     },
     {
        "$sort": {
            "userfiles.createdFileAt": -1
        }
    },
     {
        "$group": {
            "Items": {
                "$push": "$userfiles"
            },
            "_id": 1
        }
    }, 
    {
        "$project": {
            "_id": 0,
            "Items": 1
        }
      }
    ]);
    if(getAllFiles.length){
      res.json({userfiles:getAllFiles[0].Items, status: "success" });
    }else
    res.json({userfiles:[], status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const FileController = {
  createFile,
  createSingleFile,
  deleteFile,
  getAllfile,
};
export default FileController;
