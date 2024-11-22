// src/services/webhookService.js

const axios = require("axios");

/**
 * Send a webhook notification to a specified URL.
 * @param {string} url - The webhook URL to send the notification to.
 * @param {Object} data - The payload to send in the webhook.
 * @returns {Promise<void>} - Resolves if the webhook is sent successfully.
 */
const sendWebhook = async (url, data) => {
    try {
        if (!url) {
            throw new Error("Webhook URL is not defined.");
        }

        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(`Webhook sent successfully to ${url}:`, response.status);
    } catch (error) {
        console.error(`Failed to send webhook to ${url}:`, error.message);
    }
};

module.exports = {
    sendWebhook,
};
