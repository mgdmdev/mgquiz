// src/services/cacheService.js

const NodeCache = require("node-cache");

// Configure the cache
const cache = new NodeCache({
    stdTTL: 3600, // Default time-to-live: 1 hour
    checkperiod: 120, // Check expired keys every 2 minutes
});

/**
 * Get data from the cache.
 * @param {string} key - The key to retrieve the cached data for.
 * @returns {any} - The cached data or null if not found.
 */
const get = (key) => {
    return cache.get(key) || null;
};

/**
 * Set data in the cache.
 * @param {string} key - The key to store the data under.
 * @param {any} value - The data to store in the cache.
 * @param {number} [ttl] - Optional time-to-live in seconds.
 */
const set = (key, value, ttl) => {
    cache.set(key, value, ttl);
};

/**
 * Delete data from the cache.
 * @param {string} key - The key to delete from the cache.
 */
const deleteKey = (key) => {
    cache.del(key);
};

/**
 * Clear all data from the cache.
 */
const clear = () => {
    cache.flushAll();
};

module.exports = {
    get,
    set,
    delete: deleteKey,
    clear,
};
