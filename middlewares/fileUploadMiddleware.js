const multer = require('multer');

// Set up multer storage in memory (no persistent storage needed)
const storage = multer.memoryStorage();

// Set file size limits (optional)
const limits = {
    fileSize: 5 * 1024 * 1024, // Limit to 5 MB
};

// Filter file types (only PDFs and DOCX files allowed)
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type. Only PDF and DOCX files are allowed.'));
    }
};

// Create the multer instance
const upload = multer({
    storage,
    limits,
    fileFilter,
});

module.exports = upload;