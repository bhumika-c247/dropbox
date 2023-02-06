import users from "../models/users.js";
const createFile = async (req, res) => {
  const { files } = req;
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
      { _id: "63e10833667516a77a5e3141" },
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
const FileController = {
  createFile,
  deleteFile,
};
export default FileController;
