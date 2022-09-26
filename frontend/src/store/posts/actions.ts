import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, Post } from "common/types/types";
import { GetPostRequestDto } from "services/posts/posts.service";
import { ActionType } from "./common";

const getPosts = createAsyncThunk<
Post[],
void,
AsyncThunkConfig
>(ActionType.GET_POSTS, async (payload, { extra }) => {
  const {postsApi} = extra;

  const posts = postsApi.getAll();

  return posts;
})

const getTags = createAsyncThunk<
string[],
void,
AsyncThunkConfig
>(ActionType.GET_TAGS, (payload, { extra}) => {
  const { tagsApi } = extra;
  const tags = tagsApi.getAll();

  return tags;
});

const getPost = createAsyncThunk<
Post,
string,
AsyncThunkConfig
>(ActionType.GET_POST, (payload, { extra}) => {
  const { postsApi } = extra;
  console.log(payload);
  
  const post = postsApi.getPost(payload);

  return post;
})

export { getPosts, getTags, getPost };