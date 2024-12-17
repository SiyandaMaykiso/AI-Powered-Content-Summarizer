const multer = require('multer');


const storage = multer.memoryStorage();


const limits = {
    fileSize: 5 * 1024 * 1024, 
};


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


const upload = multer({
    storage,
    limits,
    fileFilter,
});

module.exports = upload;