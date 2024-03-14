import { userServices } from "../services/index.js";
import responseUtil from "../utilities/response.utility.js";

const createUser = async (req, res) => {
  const response = await userServices.createUser(req);
  console.log(response);
  if (response.status == false) {
    return responseUtil.noSuccessResponse(res, response?.message);
  } else if (response) {
    return responseUtil.successResponse(res, response?.message, {
      data: response?.data,
    });
  } else {
    return responseUtil.validationErrorResponse(res, response.message);
  }
};
const login = async (req, res) => {
  const response = await userServices.login(req);
  if (response.status == false) {
    console.log(response.message);
    return responseUtil.noSuccessResponse(res, response?.message);
  } else if (response) {
    return responseUtil.successResponse(res, response?.message, {
      data: response?.data,
    });
  } else {
    return responseUtil.validationErrorResponse(res, response.message);
  }
};
const myprofile = async (req, res) => {
  const response = await userServices.myprofile(req);
  if (response.status == false) {
    console.log(response.message);
    return responseUtil.noSuccessResponse(res, response?.message);
  } else if (response) {
    return responseUtil.successResponse(res, response?.message, {
      data: response?.data,
    });
  } else {
    return responseUtil.validationErrorResponse(res, response.message);
  }
};
const logoutAll = async (req, res) => {
  const response = await userServices.logoutAll(req);
  if (response.status == false) {
    return responseUtil.noSuccessResponse(res, response?.message);
  } else if (response) {
    return responseUtil.successResponse(res, response?.message, {
      data: response?.data,
    });
  } else {
    return responseUtil.validationErrorResponse(res, response.message);
  }
};
const logout = async (req, res) => {
  const response = await userServices.logout(req);
  if (response.status == false) {
    return responseUtil.noSuccessResponse(res, response?.message);
  } else if (response) {
    return responseUtil.successResponse(res, response?.message, {
      data: response?.data,
    });
  } else {
    return responseUtil.validationErrorResponse(res, response.message);
  }
};

export { createUser, login, myprofile, logoutAll, logout };
