class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    // this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ExpressError;