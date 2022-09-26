import Container from "@mui/material/Container";
import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoute } from "common/enums/app/app";

import { Home, FullPost, Registration, AddPost, Login } from "../../pages";
import { Header } from "components/header/index";

const App:FC = () => {

  return (
    <>
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
