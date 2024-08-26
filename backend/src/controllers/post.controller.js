import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.models.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";

export const createPostController = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!(title && description)) {
    throw new ApiError(400, "All feilds are required");
  }
  const imageFilePath = req.file.path;
  if (!imageFilePath) {
    throw new ApiError(404, "Image file path not found");
  }
  const image = await uploadOnCloudnary(imageFilePath);
  if (!image) {
    throw new ApiError(500, "Unable to upload image on cloudnary");
  }
  const post = await Post.create({
    title,
    description,
    image: image.url,
    createdBy: req.user._id,
  });
  if (!post) {
    throw new ApiError(500, "Internal Server Error while creating the post");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

export const userPostController = asyncHandler(async (req, res) => {
  const userPost = await Post.find({ createdBy: req.user._id });
  if (!userPost) {
    throw new ApiError(404, "Post does not exist");
  }
  return res.status(200).json(new ApiResponse(200, userPost, "User Post fetched successfully"));
});

export const getPostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Invalid Id or Id is missing");
  }
  const singlePost = await Post.findById(id);
  if (!singlePost) {
    throw new ApiError(404, "Post does not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, singlePost, "Post fetched successfully"));
});

export const updatePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Invalid Id or Id is missing");
  }
  const userId=req.user._id;
  const post=await Post.findById(id);
  if(!post){
    throw new ApiError(404, "Post not found");
  }
  if(post.createdBy.toString()!==userId.toString()){
    throw new ApiError(403, "You are not authorized to update this post");
  }
  const { title, description } = req.body;
  let imageUrl=post.image
  if (req.file) {
    const result = await uploadOnCloudnary(req.file.path);
    if (result) {
      imageUrl = result.secure_url;
    } else {
      throw new ApiError(500, "Error uploading image to Cloudinary");
    }
  }


  if (!title && !description && !req.file) {
    throw new ApiError(
      400,
      "At least one field (title, description, or image) is required to update"
    );
  }
  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (req.file || imageUrl !== post.image) updateData.image = imageUrl;
  const updatePost = await Post.findByIdAndUpdate(
    id,
    {
      $set: updateData,
    },
    { new: true }
  );
  if (!updatePost) {
    throw new ApiError(500, "Internal Server error while updaing the post");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, updatePost, "Post updated successfully"));
});

export const deletePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Invalid Id or Id is missing");
  }
  const userId=req.user._id;
  const post=await Post.findById(id);
  if(!post){
    throw new ApiError(404, "Post not found");
  }
  if(post.createdBy.toString()!==userId.toString()){
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    throw new ApiError(500, "Internal Server error while deleting the post");
  }
  return res
    .status(204)
    .json(new ApiResponse(204, "Post deleted successfully"));
});
