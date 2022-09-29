import { createReducer } from "@reduxjs/toolkit";
import { DataStatus } from "common/enums/enums";
import { User } from "common/types/types";
import { getUser, login, logout, register } from "./actions";

type State = {
  dataStatus: DataStatus
  user: User | null
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(login.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(login.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;
  });
  builder.addCase(login.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });

  builder.addCase(logout.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.user = null;
  });
  builder.addCase(logout.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = null;
  });
  builder.addCase(logout.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });

  builder.addCase(getUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUser.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;
  });
  builder.addCase(getUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });

  builder.addCase(register.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(register.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;
  });
  builder.addCase(register.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });

})

export { reducer };