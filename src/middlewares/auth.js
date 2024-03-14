import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisis");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const checkRole = (roles) => async (req, res, next) => {
  let { _id } = req.user;

  //retrieve employee info from DB
  const user = await User.findOne({ _id });

  !roles.includes(user.role)
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
};

export { auth, checkRole };
