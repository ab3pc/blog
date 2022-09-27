import { createReducer } from "@reduxjs/toolkit";
import { DataStatus } from "common/enums/enums";
import { User } from "common/types/types";
import { login, logout } from "./actions";

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

})

export { reducer };