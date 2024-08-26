import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, "Unauthorized request");
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(decodedToken._id).select("-password");
  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }
  req.user = user;
  next();
});
