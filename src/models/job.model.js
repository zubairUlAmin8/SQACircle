import { mongoose } from "mongoose";

import * as validator from "validator";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    salary: {
      type: Number,
      min: 0,
    },
    requirements: [String], // Array of job requirements or skills
    postedAt: {
      type: Date,
      default: Date.now,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export { Job };
