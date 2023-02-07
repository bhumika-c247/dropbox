import users from "../models/users.js";
const createFile = async (req, res) => {
  try {
    const id = req.params.id;
    const { body } = req;
    let condition = {
      _id: id, isDeleted: false
    }
    const user = await users.findOne(condition);
    if (!user) {
      return res.status(404).json({
        message: message.INVOICE_NOT_FOUND
      });
    }
    let fileUploads = []
    let oldFilesArray = []
    if (user && user.fileUploads.length > 0) {
      //Itrate user files
      for (let j = 0; j < user.fileUploads.length; j++) {
        oldFilesArray.push(user.fileUploads[j])
      }
    }
    if (req.files.length > 0) {
      for (let index = 0; index < req.files.length; index++) {
        fileUploads.push(req.files[index].location);
      }
    }
    if (oldFilesArray.length > 0) {
      for (let index = 0; index < oldFilesArray.length; index++) {
        fileUploads.push(oldFilesArray[index]);
      }
    }
    let updateData = {
      fileUploads,
    }
    // body.fileUploads = fileUploads
    await users.updateOne({ _id: id }, { $set: updateData })
    return res.status(200).json({ message: "Updated" });

  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : message.ERROR_MESSAGE,
    });
  }
};
const deleteFile = async (req, res) => {
  try {
    const deletedData = await users.findOneAndUpdate(
      { _id: "63e10833667516a77a5e313e" },
      { $pull: { userfiles: { _id: "63e10947c2187cdb4fe8535f" } } },
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
  deleteFile,
  getAllfile,
};
export default FileController;
