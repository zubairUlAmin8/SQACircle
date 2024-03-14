import { User } from "../models/user.model.js";

const createUser = async (req) => {
  try {
    const user = new User(req.body);

    await user.save();

    const token = await user.generateAuthToken();
    return {
      data: { user: user, token },
      status: true,
      message: "New user created",
    };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
};
const login = async (req) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    return {
      data: { user: user.userProfileData(), token },
      status: true,
      message: "User has been found",
    };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
};
const myprofile = async (req) => {
  try {
    return {
      data: { user: req.user.userProfileData() },
      status: true,
      message: "User has been found",
    };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
};
const logoutAll = async (req) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    return {
      status: true,
      message: "User Has been Log out from all devices",
    };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
};
const logout = async (req) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    return {
      status: true,
      message: "User Has been Logged out from this devices",
    };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
};
export { createUser, login, myprofile, logoutAll, logout };
