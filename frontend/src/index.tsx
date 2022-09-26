import "./index.scss";

import React from "react";
import { BrowserRouter} from 'react-router-dom';
import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

import { App } from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "store/store";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Provider store = {store}>
        <App />
      </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </>
);
