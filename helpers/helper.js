export const api = async (message, res, data, statusCode) => {
  const response = {};

  response.error = false;
  response.message = message;
  response.status = statusCode;
  response.body = data;
  response.success = true;

  return res.status(response.status).json({
    success: response.success,
    message: response.message,
    data: response.body,
    error: response.error,
  });
};

export const apiError = async (message, res, error, statusCode) => {
  let response = {};

  response.error = error;
  response.message = message;
  response.status = statusCode;
  response.success = false;

  return res.status(response.status).json({
    success: response.success,
    message: response.message,
    error: response.error,
  });
};
