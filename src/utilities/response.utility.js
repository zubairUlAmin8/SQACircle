import config from "../config/index.js";
import messageUtil from "./message.utility.js";

const successResponse = (res, message, result, status) => {
  const response = {
    status: true,
    message,
  };

  if (result.data) {
    response.result = result;
  }
  // response.status = status;
  res.status(config.HTTP_STATUS_CODES.OK).send(response);
};

const noSuccessResponse = (res, message) => {
  const response = {
    status: false,
    message,
  };
  res.send(response);
};

const serverErrorResponse = (res, error) => {
  // loggerUtil.error({
  //     message: error.toString(),
  //     level: 'error'
  // })
  res.status(config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
    status: false,
    error: error.toString(),
    message: messageUtil.serverError,
  });
};

const validationErrorResponse = (res, errors) => {
  res.status(config.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
    status: false,
    error: errors,
    message: messageUtil.validationErrors,
  });
};

const badRequestErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
    status: false,
    message,
  });
};

const authorizationErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.UNAUTHORIZED).send({
    status: false,
    message,
  });
};

const manyRequestErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.TOO_MANY_REQUESTS).send({
    status: false,
    message,
  });
};

export default {
  successResponse,
  noSuccessResponse,
  serverErrorResponse,
  validationErrorResponse,
  badRequestErrorResponse,
  authorizationErrorResponse,
  manyRequestErrorResponse,
};
