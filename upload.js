
// Before use:
// Create a new directory named "uploads" on parent directory
// Coded by HarunBulbull

const express = require("express");
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");

router.use(cors())
router.use(bodyParser.json({ charset: 'utf-8', limit: '2000kb' }));
router.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        res.json(req.file);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
      }
});

module.exports = router;