import STATUS from './statusCode.js';

class AppError extends Error {
  constructor(message, statusCode = STATUS.INTERNAL_ERROR) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
