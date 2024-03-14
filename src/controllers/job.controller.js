import { jobServices } from "../services/index.js";
import responseUtil from "../utilities/response.utility.js";

const viewJob = async (req, res) => {
  return jobServices.viewJob();
};
const createJob = async (req, res) => {
  const response = await jobServices.createJob(req);

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
export { viewJob, createJob };
