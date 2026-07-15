/**
 * Consistent API response helper.
 */
export const sendResponse = (res, statusCode, message, data = null) => {
  const response = { success: statusCode < 400, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

export const sendError = (res, statusCode, message, errors = null) => {
  const response = { success: false, message };
  if (errors !== null) response.errors = errors;
  return res.status(statusCode).json(response);
};
