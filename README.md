
# MGQuiz Backend

The MGQuiz Backend is an API service designed to generate AI-powered quizzes for articles. It integrates with the OpenAI API to create engaging quizzes and provides caching, rate limiting, and webhook functionality for efficient and scalable operations.

---

## Features

- **AI-Powered Quiz Generation**: Uses OpenAI's API to generate quizzes based on provided article content.
- **Caching**: Stores generated quizzes to minimize API calls and improve response times.
- **Rate Limiting**: Protects the backend from abuse by controlling the number of requests.
- **Webhook Support**: Optional feature to notify clients when quizzes are ready.
- **Scalability**: Designed to work seamlessly with multiple integrations, including WordPress plugins and custom frontends.
- **Health Monitoring**: `/health` endpoint for monitoring the backend's status.

---

## Requirements

- **Node.js**: 18.x or later
- **MongoDB**: Local or hosted (e.g., MongoDB Atlas)
- **OpenAI API Key**

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mgquiz
OPENAI_API_KEY=your-openai-api-key
OPENAI_API_URL=https://api.openai.com/v1/completions
CACHE_EXPIRATION=604800 # Cache expiration time in seconds (7 days by default)
RATE_LIMIT_WINDOW_MS=60000 # Rate limit window in milliseconds
RATE_LIMIT_MAX_REQUESTS=100 # Max requests per window
WEBHOOK_URL=https://your-webhook-url # Optional: URL for webhook notifications
```

---

## Endpoints

### Quiz Endpoints
- **POST `/api/quizzes/generate`**
  - Generates a quiz for a given article.
  - **Body**:
    ```json
    {
        "articleId": "12345",
        "difficulty": "easy",
        "numQuestions": 3
    }
    ```
  - **Response**:
    ```json
    {
        "success": true,
        "quiz": [
            {
                "question": "What is the capital of France?",
                "options": ["Paris", "London", "Berlin"],
                "answer": "Paris"
            }
        ]
    }
    ```

### Article Endpoints
- **POST `/api/articles`**
  - Creates or updates an article.
  - **Body**:
    ```json
    {
        "title": "Sample Article",
        "content": "Lorem ipsum dolor sit amet..."
    }
    ```

- **GET `/api/articles/:id`**
  - Fetches an article by ID.

### Health Check
- **GET `/health`**
  - Returns the status of the backend.
  - **Response**:
    ```json
    {
        "status": "ok",
        "message": "Backend is running smoothly."
    }
    ```

---

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mgquiz-backend.git
cd mgquiz-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
- Create a `.env` file in the root directory.
- Add the required variables as described above.

### 4. Run the Application
- Start the server in development mode:
  ```bash
  npm run dev
  ```
- Start the server in production mode:
  ```bash
  npm start
  ```

---

## Testing

### Run Unit Tests
If tests are implemented:
```bash
npm test
```

### Postman/Insomnia Testing
- Import the API endpoints into your preferred API client.
- Test each endpoint with different inputs.

---

## Deployment

### Heroku
1. Ensure `Procfile` is included with the following content:
   ```
   web: npm start
   ```
2. Push the code to Heroku:
   ```bash
   git push heroku main
   ```

### DigitalOcean
- Set up a Droplet with Node.js and MongoDB installed.
- Clone the repository, install dependencies, and run the server using PM2:
  ```bash
  pm2 start server.js --name mgquiz-backend
  pm2 save
  ```

---

## Project Structure

```
mgquiz-backend/
├── controllers/
│   ├── articleController.js
│   ├── quizController.js
├── middleware/
│   ├── errorMiddleware.js
│   ├── rateLimitMiddleware.js
├── models/
│   ├── Article.js
│   ├── Quiz.js
├── routes/
│   ├── articleRoutes.js
│   ├── quizRoutes.js
├── services/
│   ├── openaiService.js
│   ├── webhookService.js
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Node.js dependencies
├── server.js           # Entry point
└── README.md           # Documentation
```

---

## Future Enhancements

1. **Analytics Integration**: Track usage stats for quizzes.
2. **Support for Multiple Quiz Types**: Allow quizzes like multiple-choice, fill-in-the-blank, etc.
3. **Multilingual Support**: Add support for generating quizzes in different languages.
4. **Enhanced Security**: Add API key authentication for client apps.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

