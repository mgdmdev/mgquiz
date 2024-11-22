// src/services/openaiService.js

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Load the API key from environment variables
});

const openai = new OpenAIApi(configuration);

/**
 * Generate quiz questions using OpenAI GPT.
 * @param {Object} params - Parameters for quiz generation.
 * @param {string} params.content - Article content for quiz generation.
 * @param {string} params.difficulty - Difficulty level (easy, medium, hard).
 * @param {number} params.numQuestions - Number of questions to generate.
 * @returns {Promise<Array>} - Generated quiz questions.
 */
const generateQuiz = async ({ content, difficulty, numQuestions }) => {
    try {
        const prompt = `
You are a quiz generator for an educational application. Based on the following article content, generate ${numQuestions} ${difficulty} multiple-choice questions. 
Each question should have exactly 4 options, with one correct answer clearly labeled.

Article Content:
${content}

Format your response as JSON:
[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct Option"
  }
]
        `;

        const response = await openai.createCompletion({
            model: "text-davinci-003", // Use OpenAI's GPT-3.5 model
            prompt,
            max_tokens: 1000,
            temperature: 0.7,
        });

        const quizData = JSON.parse(response.data.choices[0].text.trim());

        // Validate the response structure
        if (!Array.isArray(quizData)) {
            throw new Error("Invalid response format from OpenAI.");
        }

        return quizData;
    } catch (error) {
        console.error("Error generating quiz from OpenAI:", error.message);
        throw new Error("Failed to generate quiz. Please try again later.");
    }
};

module.exports = {
    generateQuiz,
};