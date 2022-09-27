import { createReducer } from "@reduxjs/toolkit";
import { DataStatus } from "common/enums/enums";
import { Post } from "common/types/types";
import { getPost, getPosts, getTags } from "./actions";

type State = {
  dataStatus: DataStatus,
  posts: Post[] ,
  post: Post | null,
  tags: string[],
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  posts: [],
  post: null,
  tags: [],
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getPosts.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getPosts.fulfilled, (state, {payload}) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.posts = payload;
    
  });
  builder.addCase(getPosts.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.posts = [];
  });

  builder.addCase(getTags.pending, (state, {payload}) => {
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(getTags.fulfilled, (state, {payload}) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.tags = payload;
  });

  builder.addCase(getTags.rejected, (state, { payload }) => {
   state.dataStatus = DataStatus.REJECTED;
   state.tags = [];
  })

  builder.addCase(getPost.pending, (state, {payload}) => {
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(getPost.fulfilled, (state, {payload}) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.post = payload;
  });

  builder.addCase(getPost.rejected, (state, { payload }) => {
   state.dataStatus = DataStatus.REJECTED;
   state.tags = [];
  })
});

export { reducer };