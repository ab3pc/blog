import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationMessage } from "common/enums/enums";
import { AsyncThunkConfig, CreatePostRequestDto, CreatePostResponseDto, Post } from "common/types/types";

import { ActionType } from "./common";

const getPosts = createAsyncThunk<
Post[],
void,
AsyncThunkConfig
>(ActionType.GET_POSTS, async (payload, { extra }) => {
  const {postsApi} = extra;

  const posts = await postsApi.getAll();

  return posts;
})

const getTags = createAsyncThunk<
string[],
void,
AsyncThunkConfig
>(ActionType.GET_TAGS, async (payload, { extra}) => {
  const { tagsApi } = extra;
  const tags = await tagsApi.getAll();

  return tags;
});

const getPost = createAsyncThunk<
Post | null,
string,
AsyncThunkConfig
>(ActionType.GET_POST, async (payload, { extra}) => {
  const { postsApi } = extra;
  try {
    const post = await postsApi.getPost(payload);

    return post;
    
  } catch (error) {
    console.log(error);
    return null
  }
});

const uploadImage = createAsyncThunk<
  string,
  {file: FormData},
  AsyncThunkConfig
  >(ActionType.UPLOAD_IMAGE, (payload, { extra}) => {  
  const { postsApi } = extra;
  const link = postsApi.uploadImage(payload.file);

  return link;
})

const createPost = createAsyncThunk<
  CreatePostResponseDto,
  CreatePostRequestDto  ,
  AsyncThunkConfig
>(ActionType.CREATE_POST, async (payload, { extra}) => {
  const { postsApi, notification } = extra;
  const newPost = await postsApi.createPost(payload)
  if (newPost) {
    notification.success(NotificationMessage.CREATE_POST)
  }
  return newPost
})

export { getPosts, getTags, getPost, uploadImage, createPost };