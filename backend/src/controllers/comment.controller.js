import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comments.models.js";

export const createCommentController = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  if (!content) {
    throw new ApiError(400, "Content is requried");
  }
  if (!postId) {
    throw new ApiError(404, "Blog Id not found");
  }
  const comment = await Comment.create({
    content,
    postId,
    createdBy: req.user._id,
  });
  if (!comment) {
    throw new ApiError(500, "Internal server error while creating the comment");
  }
  res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});

export const getAllCommentsOfPostController = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(404, "Post not found");
  }
  const allComments = await Comment.find({ postId });
  if (!allComments) {
    throw new ApiError(500, "Internal Server error Comments not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, allComments, "Comments fetched successfully"));
});
