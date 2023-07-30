import { api, apiError } from "../helpers/helper.js";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    let users = await User.findAll();
    return api("All users fetched", res, users, 200);
  } catch (error) {
    return apiError("Some error occurred", res, String(error), 500);
  }
};

export const postUser = async (req, res) => {
    try {
      let users = await User.create(req.body);
      return api("users created", res, users, 200);
    } catch (error) {
      return apiError("Some error occurred", res, String(error), 500);
    }
  };

export const getUser = async (req, res) => {
  try {
    if (req.id !== req.params.id) {
      throw "Wrong user access";
    }

    let user = await User.findByPk(req.params.id);
    return api("user fetched", res, user, 200);
  } catch (error) {
    return apiError("Some error occurred", res, String(error), 500);
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.id !== req.params.id) {
      throw "Wrong user access";
    }

    let user = await User.findByPk(req.params.id);

    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.mobile = req.body.mobile ? req.body.mobile : user.mobile;

    await user.save();

    return api("user updated", res, user, 200);
  } catch (error) {
    return apiError("Some error occurred", res, String(error), 500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.id !== req.params.id) {
      throw "Wrong user access";
    }

    let user = await User.findByPk(req.params.id);

    if (!user) {
      throw "user does not exists";
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    return api("user deleted", res, user, 200);
  } catch (error) {
    return apiError("Some error occurred", res, String(error), 500);
  }
};
