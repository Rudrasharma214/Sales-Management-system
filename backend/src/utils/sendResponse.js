import STATUS from './statusCode.js';

/**
 * Send a standardized API response
 * I use this everywhere to maintain consistency across my entire API
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - User-friendly message
 * @param {Any} data - Optional payload data
 */
export const sendResponse = (res, statusCode = STATUS.OK, message = 'Success', data) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    status: statusCode,
  });
};