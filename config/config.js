module.exports = {
    app: {
      port: process.env.PORT || 5000,
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', // Default fallback for testing
  };