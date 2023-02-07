import users from "../models/users.js";
const createFile = async (req, res) => {
  const { files } = req;
  const {userId} = req.body
  const multifile = [];
  files.forEach((ele) => {
    multifile.push({
      name: ele.originalname,
      path: ele.filename,
      size: ele.size,
      type: ele.mimetype,
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
const createSingleFile = async (req,res)=>{
  const { file } = req;
  const { userId} = req.body
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
    res.json({ data: data, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const deleteFile = async (req, res) => {
  const {userId,fileId} = req.body

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
  const { userId } = req.body
  try {
    const allFiles = await users.find({ _id: userId });
    res.json({ data: allFiles, status: "success" });
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
