import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { api, apiError } from "../helpers/helper.js";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    let authData = {
      name: req.body.name,
      email: req.bod.email,
      password: hashedPassword,
      mobile: req.body.mobile,
    };

    let user = await User.create(authData);
    return api("User is registered", res, user, 200);
  } catch (error) {
    return apiError("Some error occurred", res, String(error), 500);
  }
};

export const signin = async (req, res) => {
  try {
    const { password } = req.body.password;
    let clause = { where: {} };

    if (req.body.email) clause.where.email = req.body.email;

    const user = await User.findOne(clause);
    console.log(user);

    if (user === null) throw "Invalid user please register";

    const isMatched = await bcrypt.compare(req.body.password, user.password);
    const token = await jwt.sign({ id: user.id, name: user.name }, "secret", {
      expiresIn: "1d",
    });

    return api("User is logged In", res, { access_token: token }, 200);
  } catch (err) {
    return apiError("Some error occurred", res, String(error), 500);
  }
};
