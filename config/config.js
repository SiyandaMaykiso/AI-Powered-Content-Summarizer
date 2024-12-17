module.exports = {
  app: {
    port: process.env.PORT || 3001, 
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', 
  database: {
    url: process.env.DATABASE_URL, 
  },
  openAI: {
    apiKey: process.env.OPENAI_API_KEY, 
  },
};