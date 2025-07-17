const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  createIssue,
  getIssues,
  updateIssueStatus
} = require("../controllers/issueController");

router.post("/", upload.single("image"), createIssue);
router.get("/", getIssues);
router.put("/:id", updateIssueStatus);

module.exports = router;