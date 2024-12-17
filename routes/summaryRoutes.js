const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/fileUploadMiddleware'); 


router.post('/', authMiddleware, summaryController.summarizeContent);


router.post('/upload', authMiddleware, upload.single('file'), summaryController.summarizeFile);

module.exports = router;