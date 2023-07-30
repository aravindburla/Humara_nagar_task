import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
    const headerToken = req.headers.authorization;
    let token;
    if (headerToken) {
      const splited_token = headerToken.toString().split(" ");
      if (splited_token[0] === "Bearer") {
        splited_token.map(async (inside_token) => {
          if (inside_token !== "Bearer") {
            token = inside_token;
          }
        });
      } else {
        return next(apiError("Please login to access", res, {}, 401));
      }
      if (!token) {
        return next(apiError("Please login to access", res, {}, 401));
      }
    } else {
      return next(apiError("Please login to access", res, {}, 401));
    }

    try {
      const decodedData = jwt.verify(token, jwtSecret);
      req.user = await User.findByPk(decodedData.id);
      next();
    } catch (error) {
        return next(apiError("Invalid token", res, {}, 401));
    }
  };

