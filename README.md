# AI-Powered Content Summarizer

## Project Overview

The AI-Powered Content Summarizer is a web application designed to generate absorbable summaries of long-form content using advanced natural language processing (NLP) technology. This project aims to streamline information sharing by reducing large articles into brief, easy-to-digest summaries, turning academic and business articles into short-form content. The frontend is built with React, and the backend is powered by Node.js with a PostgreSQL database hosted on Heroku. The application utilizes NLP models to provide accurate and contextually relevant summaries.

This project is part of my portfolio to demonstrate my skills in building AI-driven applications that enhance content accessibility for users.

[AI-Powered Content Summarizer](https://ai-powered-content-summarizer-71f343ba410f.herokuapp.com/)

## Screenshots

### Home Page
![Home Page](https://github.com/SiyandaMaykiso/AI-Powered-Content-Summarizer/blob/main/screenshots/Home_Page_Screenshot.png)

### Summary Display
![Summary Display](https://github.com/SiyandaMaykiso/AI-Powered-Content-Summarizer/blob/main/screenshots/Summary_Display_Screenshot.png)

### Summary History
![Summary History](https://github.com/SiyandaMaykiso/AI-Powered-Content-Summarizer/blob/main/screenshots/Summary_Display_Screenshot.png)


## Features

### Natural Language Processing (NLP)

- The application uses advanced NLP to create accurate and coherent summaries of lengthy content, such as articles or reports.

### User Authentication

- JWT (JSON Web Token) authentication ensures secure access, allowing users to save and view their past summaries.

### Persistent Summary History

- User summaries are stored in a Heroku PostgreSQL database, enabling users to revisit previously generated summaries.

### Adjustable Summary Length

- Users can select their preferred summary length, allowing for flexible content customization based on needs.
### Responsive User Interface

- The user interface, built with React, is optimized for both desktop and mobile, providing a seamless experience across devices.
- Includes a toggle between **dark mode** and **light mode**, allowing users to choose their preferred theme for better readability and reduced eye strain in different lighting environments.

### Scalable Cloud Hosting

- Hosted on Heroku, the app leverages cloud scalability for reliable performance and accessibility.

## How to Use the AI-Powered Content Summarizer

### 1. Visit the Application URL

- Access the application in your web browser at: [AI-Powered Content Summarizer](https://ai-powered-content-summarizer-71f343ba410f.herokuapp.com/).

### 2. Register or Log In

- **New Users**: Click "Register" to create an account. Complete the form with your username and password, then click "Register" to begin.
- **Returning Users**: Click "Login" and enter your credentials to access your saved summaries.

### 3. Upload Content or Paste Text

- After logging in, you can upload a document or paste text directly into the content input box.

### 4. Generate a Summary

- Choose the desired summary length (short, medium, or long) and click "Summarize". The app will display a concise version of the input content.

### 5. Review Saved Summaries

- Access your previously generated summaries from your account history, accessible from the dashboard.

### 6. Log Out

- To end your session, click "Logout", which securely logs you out and clears your authentication token from local storage.