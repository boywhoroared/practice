// pg 276


// tryCatch(sendEmail, logToSnapErrors)

function tryCatch(callback: () => unknown, errorHandler: (error: Error) => unknown) {
  try {
    return callback();
  } catch (error) {
    return errorHandler(error);
  }
}
