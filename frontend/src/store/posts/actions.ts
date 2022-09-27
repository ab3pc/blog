import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, Post } from "common/types/types";

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
})

export { getPosts, getTags, getPost };