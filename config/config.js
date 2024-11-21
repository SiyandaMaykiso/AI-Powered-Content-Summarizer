module.exports = {
  app: {
    port: process.env.PORT || 3001, // Use PORT=3001 to match the updated .env file
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', // Fallback for testing
  database: {
    url: process.env.DATABASE_URL, // Use DATABASE_URL from the .env file
  },
  openAI: {
    apiKey: process.env.OPENAI_API_KEY, // Use OpenAI API Key from the .env file
  },
};