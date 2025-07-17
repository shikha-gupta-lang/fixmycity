const Issue = require("../models/Issue");
const cloudinary = require("cloudinary").v2;

const createIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const upload = await cloudinary.uploader.upload(req.file.path);

    const newIssue = new Issue({
      title,
      description,
      location,
      imageUrl: upload.secure_url
    });

    const saved = await newIssue.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createIssue, getAllIssues };
