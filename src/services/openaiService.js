const { OpenAIApi, Configuration } = require("openai");

// Initialize OpenAI API client with API Key and Organization ID
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API Key
    organization: "org-6Si0MO5Vk3qkyKjZAnSs9tpn", // Your OpenAI Organization ID
});

const openai = new OpenAIApi(configuration);

/**
 * Generate a quiz for a given article
 * @param {string} content - The content of the article
 * @param {string} difficulty - Difficulty level (e.g., "easy", "medium", "hard")
 * @param {number} numQuestions - Number of questions to generate
 * @returns {Promise<object>} - Generated quiz data
 */
const generateQuiz = async (content, difficulty, numQuestions) => {
    try {
        // Validate input
        if (!difficulty) {
            throw new Error("Difficulty level is required.");
        }
        if (typeof difficulty !== "string") {
            throw new Error("Difficulty must be a string.");
        }

        // Construct the prompt for OpenAI
        const prompt = `Create a ${numQuestions}-question quiz based on the following article content:
        Difficulty: ${difficulty.toUpperCase()}
        Content: "${content}"
        Format the quiz as a JSON array, where each question has:
        - "question": The question text.
        - "options": An array of four possible answers.
        - "answer": The correct answer.`;

        // Send request to OpenAI
        const response = await openai.createChatCompletion({
            model: "gpt-4o", // GPT-4 optimized model
            messages: [
                {
                    role: "system",
                    content: "You are an assistant specializing in creating quizzes.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7, // Adjust creativity level
            max_tokens: 1000, // Set token limit
        });

        // Parse and return the generated quiz
        const quiz = JSON.parse(response.data.choices[0].message.content);
        return quiz;
    } catch (error) {
        console.error("Error generating quiz:", error.response?.data || error.message);
        throw new Error("Failed to generate quiz. Please try again later.");
    }
};

module.exports = { generateQuiz };