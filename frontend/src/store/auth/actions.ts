import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationMessage, StorageKey } from "common/enums/enums";
import { AsyncThunkConfig, User, UserRegisterRequestDto, UserRegisterResponseDto, UserSignInRequestDto, UserSignInResponseDto } from "common/types/types";

import { ActionType } from "./common";

const login = createAsyncThunk<
UserSignInResponseDto | null,
UserSignInRequestDto,
AsyncThunkConfig
>(ActionType.LOGIN, async (payload, { extra }) => {
  const {authApi , notification, storage} = extra;
  try {
    const auth = await authApi.signIn(payload);
    const token = auth?.token;
    if (token) {
      storage.setItem(StorageKey.TOKEN, token)
    }
    notification.success(NotificationMessage.SUCCESS);

  return auth;
  } catch (error) {
    notification.error(error.response.data.message)

    return null
  }
  
});

const logout = createAsyncThunk<void, void, AsyncThunkConfig>(ActionType.LOGOUT,(payload, { extra}) => {
  const { storage } = extra;
  storage.removeItem(StorageKey.TOKEN);
});

const getUser = createAsyncThunk<User, void, AsyncThunkConfig>(ActionType.GET_USER, (payload, { extra}) => {
  const { authApi } = extra;
  const user = authApi.getUser();

  return user;
})

const register = createAsyncThunk<
  UserRegisterResponseDto,
  UserRegisterRequestDto,
  AsyncThunkConfig
  >(ActionType.REGISTER, async (payload, { extra }) => {
    const { authApi, storage, notification } = extra;
    const user = await authApi.register(payload);
    const token = user.token;
    if(user) {
      storage.setItem(StorageKey.TOKEN, token)
      notification.success(`Welcome ${user.fullName}`)
    }
  
    return user
  })


export { login, logout, getUser, register };