const axios = require('axios');
const crypto = require('crypto');

/**
 * Send a webhook notification to a given URL with a payload.
 * @param {string} url - The webhook URL to send the notification to.
 * @param {Object} payload - The data payload to send.
 * @param {string} secret - The secret used to sign the webhook.
 * @returns {Promise<void>}
 */
const sendWebhook = async (url, payload, secret) => {
  try {
    // Generate a signature for payload verification
    const signature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    // Send the webhook request
    await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': `sha256=${signature}`, // Custom header for payload verification
      },
    });

    console.log(`Webhook sent to ${url}`);
  } catch (error) {
    console.error(`Failed to send webhook to ${url}:`, error.message);
    // Handle retries or logging for failed webhooks
  }
};

module.exports = { sendWebhook };
