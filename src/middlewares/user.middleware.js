import responseUtil from '../utilities/response.utility.js';
import { validationResult } from 'express-validator';

const isRequiredFeilds = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return responseUtil.validationErrorResponse(res, 'All fields are required');
  }
  next();
};

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseUtil.validationErrorResponse(res, errors.array());
  }
  next();
};

export { isRequiredFeilds, checkValidationResult };
