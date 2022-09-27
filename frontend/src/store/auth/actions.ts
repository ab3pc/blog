import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationMessage, StorageKey } from "common/enums/enums";
import { AsyncThunkConfig, UserSignInRequestDto, UserSignInResponseDto } from "common/types/types";

import { ActionType } from "./common";

const login = createAsyncThunk<
UserSignInResponseDto,
UserSignInRequestDto,
AsyncThunkConfig
>(ActionType.LOGIN, async (payload, { extra }) => {
  const {authApi , notification} = extra;
  try {
    const auth = await authApi.signIn(payload);
    notification.success(NotificationMessage.SUCCESS)
  return auth;
  } catch (error) {
    notification.error(error.response.data.message)

    return null
  }
  
});

const logout = createAsyncThunk<void, void, AsyncThunkConfig>(ActionType.LOGOUT,(payload, { extra}) => {
  const { storage } = extra;
  storage.removeItem(StorageKey.TOKEN);
})



export { login, logout };