import Container from "@mui/material/Container";
import { FC } from "react";
import { Routes, Route, Spinner } from "components";
import { AppRoute, DataStatus, StorageKey } from "common/enums/app/app";

import { Home, FullPost, Registration, AddPost, Login } from "pages";
import { Header } from "components/header/index";
import { Toast } from "components/common/common";
import { useAppDispatch, useAppSelector, useEffect } from "hooks/hooks";
import { storage } from "services/services";
import { authActions } from "store/actions";

const App:FC = () => {
const dispatch = useAppDispatch();
const {user, dataStatus} = useAppSelector(({ auth }) => ({
  user: auth.user,
  dataStatus: auth.dataStatus
}));

const hasUser = Boolean(user);
const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));

useEffect(() => {
  if(hasToken) {
    dispatch(authActions.getUser());
  }
},[dispatch, hasToken]);

if(!hasUser && hasToken && dataStatus === DataStatus.PENDING) {
  return <Spinner isOverflow/>
}

  return (
    <>
      <Toast/>
      <Header />
      <Container maxWidth="lg">
       <Routes>
        <Route path={AppRoute.ROOT} element={<Home/>}/>
        <Route path={AppRoute.POSTS_$ID} element={<FullPost/>}/>
        <Route path={AppRoute.ADD_POST} element={<AddPost/>}/>
        <Route path={AppRoute.LOGIN} element={<Login/>}/>
        <Route path={AppRoute.REGISTER} element={<Registration/>}/>
       </Routes>
      
      </Container>
    </>
  );
}

export { App };
