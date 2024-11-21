const { Configuration, OpenAIApi } = require('openai');

// Configure the OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Generate a quiz based on the provided content.
 * @param {string} content - The article content to generate quiz questions from.
 * @param {Object} options - Options for quiz generation (e.g., number of questions, difficulty level).
 * @returns {Promise<Object[]>} - An array of quiz questions.
 */
const generateQuiz = async (content, options = { numQuestions: 3, difficulty: 'medium' }) => {
  try {
    const prompt = `
      Generate ${options.numQuestions} ${options.difficulty}-level multiple-choice questions from the following article content:
      "${content}"
      Each question should include:
      - A question text
      - Three options
      - One correct answer

      Format the response as a JSON array of objects:
      [
        {
          "question": "Sample question?",
          "options": ["Option 1", "Option 2", "Option 3"],
          "correctAnswer": "Correct Option"
        }
      ]
    `;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 300,
      temperature: 0.7, // Adjust creativity
    });

    // Parse and return the generated questions
    return JSON.parse(response.data.choices[0].text.trim());
  } catch (error) {
    console.error('Error generating quiz:', error.message);
    throw new Error('Failed to generate quiz from OpenAI.');
  }
};

module.exports = { generateQuiz };
