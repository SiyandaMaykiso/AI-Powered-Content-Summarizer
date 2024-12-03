// Import necessary modules
const Summary = require('../models/Summary'); // Import Summary model
const pdfParse = require('pdf-parse'); // For PDF text extraction
const mammoth = require('mammoth'); // For Word (.docx) text extraction

// Summarize text content
const summarizeContent = async (req, res) => {
  try {
    const { content } = req.body;

    // Replace this with actual summarization logic, e.g., using an AI API
    const summary = content.slice(0, 100) + '...'; // Placeholder for summarization

    // Save summary to database
    const savedSummary = await Summary.create({ content, summary, userId: req.user.id });

    res.json({ summary: savedSummary.summary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to summarize content', details: error.message });
  }
};

// Summarize content from uploaded file
const summarizeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    let extractedText = '';

    // Handle different file types
    if (file.mimetype === 'application/pdf') {
      // Extract text from PDF
      const pdfData = await pdfParse(file.buffer);
      extractedText = pdfData.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Extract text from Word (.docx)
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      extractedText = result.value;
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Only PDF and DOCX are allowed.' });
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ error: 'Failed to extract text from the file.' });
    }

    // Summarize the extracted text
    const summary = extractedText.slice(0, 100) + '...'; // Placeholder summarization logic

    // Save summary to database
    const savedSummary = await Summary.create({ content: extractedText, summary, userId: req.user.id });

    res.json({ summary: savedSummary.summary });
  } catch (error) {
    console.error('Error summarizing file:', error);
    res.status(500).json({ error: 'Failed to summarize file content', details: error.message });
  }
};

module.exports = { summarizeContent, summarizeFile };