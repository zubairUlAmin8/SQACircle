import { mongoose } from "mongoose";

import * as validator from "validator";
import * as bcrypt from "bcrypt";

// import * as jwt from "jsonwebtoken";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "RECRUITER", "JOB_SEEKER", "VISTOR", "BLOGGER"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "recruiter",
});

//Generate JWT token at the time of login and signup
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  try {
    const token = jwt.sign({ _id: user._id.toString() }, "thisis", {
      expiresIn: "24 Hours",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (e) {
    console.error("Error generating token:", e);
    throw e;
  }
};

//Statics method to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password not matched");
  }
  return user;
};
// Hiding Private date or we can do directly by converting userProfileData to toJSON
userSchema.methods.userProfileData = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};
//saving hash password into db
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export { User };
