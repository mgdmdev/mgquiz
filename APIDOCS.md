
# **MGQuiz API Documentation**

### **Base URL**:
```plaintext
https://quiz-api.mediageneral.digital
```

---

## **Health Check**

### **1. Health Endpoint**
- **Description**: Confirms that the service is running.
- **Method**: `GET`
- **Endpoint**: `/health`
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      {
          "status": "healthy"
      }
      ```

### **2. Ready Endpoint**
- **Description**: Confirms that the service is ready to handle requests.
- **Method**: `GET`
- **Endpoint**: `/ready`
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      {
          "status": "ready"
      }
      ```

---

## **Articles**

### **1. Get All Articles**
- **Description**: Retrieves all articles in the database.
- **Method**: `GET`
- **Endpoint**: `/api/articles`
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      [
          {
              "_id": "67406ec08c82b2367acf0970",
              "title": "Sample Article",
              "content": "This is a sample article content.",
              "createdAt": "2024-11-22T10:00:00Z",
              "updatedAt": "2024-11-22T11:00:00Z"
          }
      ]
      ```

### **2. Get Article by ID**
- **Description**: Retrieves a specific article by its ID.
- **Method**: `GET`
- **Endpoint**: `/api/articles/:id`
- **Parameters**:
    - `id` (Path): The unique ID of the article.
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      {
          "_id": "67406ec08c82b2367acf0970",
          "title": "Sample Article",
          "content": "This is a sample article content.",
          "createdAt": "2024-11-22T10:00:00Z",
          "updatedAt": "2024-11-22T11:00:00Z"
      }
      ```

### **3. Create a New Article**
- **Description**: Creates a new article.
- **Method**: `POST`
- **Endpoint**: `/api/articles`
- **Request Body**:
    ```json
    {
        "title": "New Article",
        "content": "Content of the new article."
    }
    ```
- **Response**:
    - **Status Code**: `201`
    - **Body**:
      ```json
      {
          "_id": "67406ec08c82b2367acf0971",
          "title": "New Article",
          "content": "Content of the new article.",
          "createdAt": "2024-11-22T10:30:00Z",
          "updatedAt": "2024-11-22T10:30:00Z"
      }
      ```

### **4. Update an Article**
- **Description**: Updates an article by its ID.
- **Method**: `PUT`
- **Endpoint**: `/api/articles/:id`
- **Parameters**:
    - `id` (Path): The unique ID of the article.
- **Request Body**:
    ```json
    {
        "title": "Updated Title",
        "content": "Updated content."
    }
    ```
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      {
          "_id": "67406ec08c82b2367acf0971",
          "title": "Updated Title",
          "content": "Updated content.",
          "createdAt": "2024-11-22T10:30:00Z",
          "updatedAt": "2024-11-22T11:30:00Z"
      }
      ```

### **5. Delete an Article**
- **Description**: Deletes an article by its ID.
- **Method**: `DELETE`
- **Endpoint**: `/api/articles/:id`
- **Parameters**:
    - `id` (Path): The unique ID of the article.
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      {
          "message": "Article deleted successfully."
      }
      ```

---

## **Quizzes**

### **1. Get All Quizzes**
- **Description**: Retrieves all quizzes in the database.
- **Method**: `GET`
- **Endpoint**: `/api/quizzes`
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      [
          {
              "_id": "67406ec08c82b2367acf0972",
              "articleId": "67406ec08c82b2367acf0970",
              "difficulty": "medium",
              "questions": [
                  {
                      "question": "What is the capital of France?",
                      "options": ["Paris", "London", "Berlin", "Madrid"],
                      "answer": "Paris"
                  }
              ],
              "createdAt": "2024-11-22T10:30:00Z",
              "updatedAt": "2024-11-22T10:30:00Z"
          }
      ]
      ```

### **2. Get Quiz by ID**
- **Description**: Retrieves a specific quiz by its ID.
- **Method**: `GET`
- **Endpoint**: `/api/quizzes/:id`
- **Parameters**:
    - `id` (Path): The unique ID of the quiz.
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      {
          "_id": "67406ec08c82b2367acf0972",
          "articleId": "67406ec08c82b2367acf0970",
          "difficulty": "medium",
          "questions": [
              {
                  "question": "What is the capital of France?",
                  "options": ["Paris", "London", "Berlin", "Madrid"],
                  "answer": "Paris"
              }
          ],
          "createdAt": "2024-11-22T10:30:00Z",
          "updatedAt": "2024-11-22T10:30:00Z"
      }
      ```

### **3. Generate a New Quiz**
- **Description**: Generates a new quiz for an article using OpenAI.
- **Method**: `POST`
- **Endpoint**: `/api/quizzes/generate`
- **Request Body**:
    ```json
    {
        "articleId": "67406ec08c82b2367acf0970",
        "difficulty": "easy",
        "numQuestions": 3
    }
    ```
- **Response**:
    - **Status Code**: `201`
    - **Body**:
      ```json
      {
          "_id": "67406ec08c82b2367acf0973",
          "articleId": "67406ec08c82b2367acf0970",
          "difficulty": "easy",
          "questions": [
              {
                  "question": "What is 2 + 2?",
                  "options": ["3", "4", "5", "6"],
                  "answer": "4"
              },
              {
                  "question": "What is the capital of France?",
                  "options": ["Paris", "London", "Berlin", "Madrid"],
                  "answer": "Paris"
              }
          ],
          "createdAt": "2024-11-22T12:00:00Z",
          "updatedAt": "2024-11-22T12:00:00Z"
      }
      ```

### **4. Delete a Quiz**
- **Description**: Deletes a quiz by its ID.
- **Method**: `DELETE`
- **Endpoint**: `/api/quizzes/:id`
- **Parameters**:
    - `id` (Path): The unique ID of the quiz.
- **Response**:
    - **Status Code**: `200`
    - **Body**:
      ```json
      {
          "message": "Quiz deleted successfully."
      }
      ```
