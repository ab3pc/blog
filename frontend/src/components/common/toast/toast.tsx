import { FC } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: FC = () => {
  return <ToastContainer
            transition={Slide}
            position = "top-left"
            autoClose = {3000}
            theme = "colored"
  />
};

export { Toast };