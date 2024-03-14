import { Job } from "../models/job.model.js";

const viewJob = async (req) => {
  return "view job serices here this is the end ";
};

const createJob = async (req) => {
  try {
    const job = new Job({
      ...req.body,
      recruiter: req.user._id,
    });

    await job.save();

    return {
      data: job,
      status: true,
      message: "Job Has been Created ",
    };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
};
export { viewJob, createJob };
