class ApiError extends Error {
    statusCode: number;
  
    isOperational: boolean;
  
    constructor(
      statusCode: number,
      message: string,
      isOperational: boolean = true,
      validation: boolean = false,
      stack?: string,
    ) {
      super(message);
      if (validation) {
        try {
          this.message = JSON.parse(message);
        } catch (error) {
          console.error("Invalid JSON format in message:", error);
        }
      }
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      if (!stack) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = stack;
      }
    }
  }
  
  export default ApiError;