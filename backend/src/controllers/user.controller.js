import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
export const registerUserController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim === ""))
    throw new ApiError(400, "All feilds are required");
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already existed");
  }
  let avatarUrl
  const avatarLocalPath = req?.file?.path;
  if (avatarLocalPath){
    const avatar = await uploadOnCloudnary(avatarLocalPath);
    if (!avatar) throw new ApiError(404, "Avatar not found");
    avatarUrl:avatar.url
  }

  const user = await User.create({
    username,
    email,
    password,
    avatar: avatarUrl,
  });
  if (!user)
    throw new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(200)
    .json(new ApiResponse(201, "User registered successfully"));
});

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(401, "email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Please check your email! User does not exist");
  }
  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid user credentials ");
  }
  const loggedInUser=await User.findById(user._id).select("-password");
  if(!loggedInUser){
    throw new ApiError(404, "User not found");
  }
  const token = await user.generateToken();
  if (!token) {
    throw new ApiError(401, "Unable to generate token");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(201, loggedInUser, "User logged in successfully"));
});

export const logoutController=asyncHandler(async (req,res)=>{
  const options = {
    httpOnly: true,
    secure: true,
  };
  res.clearCookie("token",options).json(new ApiResponse(200,"User logged out successfully"));
})