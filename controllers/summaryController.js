// Import necessary modules
const Summary = require('../models/Summary'); // Import Summary model
const pdfParse = require('pdf-parse'); // For PDF text extraction
const mammoth = require('mammoth'); // For Word (.docx) text extraction
const axios = require('axios'); // For API calls to OpenAI

// Summarize text content using OpenAI API
const summarizeContent = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required for summarization.' });
    }

    // Call OpenAI API for summarization
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional summarizer. Provide clear, concise, and balanced summaries that highlight the main points without unnecessary details.',
          },
          {
            role: 'user',
            content: `Summarize this content briefly and clearly:\n\n${content}`,
          },
        ],
        max_tokens: 500, // Moderate length for balanced summaries
        temperature: 0.5, // Slightly increase creativity for balanced output
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract summary from OpenAI API response
    const summary = response.data.choices[0].message.content.trim();

    // Save summary to database
    const savedSummary = await Summary.create({ content, summary, userId: req.user.id });

    res.json({ summary: savedSummary.summary });
  } catch (error) {
    console.error('Error summarizing content:', error.message);
    res.status(500).json({ error: 'Failed to summarize content', details: error.message });
  }
};

// Summarize content from uploaded file using OpenAI API
const summarizeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    let extractedText = '';

    // Handle different file types
    if (file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(file.buffer);
      extractedText = pdfData.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      extractedText = result.value;
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Only PDF and DOCX are allowed.' });
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ error: 'Failed to extract text from the file.' });
    }

    // Call OpenAI API for summarization
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional summarizer. Provide clear, concise, and balanced summaries that highlight the main points without unnecessary details.',
          },
          {
            role: 'user',
            content: `Summarize this content briefly and clearly:\n\n${extractedText}`,
          },
        ],
        max_tokens: 500, // Moderate length for balanced summaries
        temperature: 0.7, // Slightly increase creativity for balanced output
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract summary from OpenAI API response
    const summary = response.data.choices[0].message.content.trim();

    // Save summary to database
    const savedSummary = await Summary.create({
      content: extractedText,
      summary,
      userId: req.user.id,
    });

    res.json({ summary: savedSummary.summary });
  } catch (error) {
    console.error('Error summarizing file:', error.message);
    res.status(500).json({ error: 'Failed to summarize file content', details: error.message });
  }
};

module.exports = { summarizeContent, summarizeFile };