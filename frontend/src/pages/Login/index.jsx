import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { authActions } from "store/actions";
import { AppRoute, DataStatus } from "common/enums/enums";
import { Navigate, Spinner } from "components";

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '12testqwe@test.com',
      password: '12345',
    },
    mode: 'onChange'
  });
  const dispatch = useAppDispatch();
  const { user, dataStatus } = useAppSelector(({auth}) => ({
    user: auth.user,
    dataStatus: auth.dataStatus
  }));
  const isLoading = dataStatus === DataStatus.PENDING;
  const hasUser = Boolean(user);

  const onSublit = (values) => {
    dispatch(authActions.login(values))
  }

  if(hasUser) {
    return <Navigate to = {AppRoute.ROOT} />
  }

  if (isLoading) {
    return <Spinner isOverflow/>
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        LOGIN
      </Typography>
      <form onSubmit={handleSubmit(onSublit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        type= "email"
        error = {Boolean(errors.email?.message)}
        {...register('email', { required: 'Enter email'})}
        helperText= {errors.email?.message}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="Password"
        fullWidth
        type= "password"
        error = {Boolean(errors.password?.message)}
        helperText= {errors.password?.message}
        {...register('password', { required: 'Enter password'})}
        />
      <Button type="submit" size="large" variant="contained" fullWidth>
        ENTER
      </Button>
      </form>
    </Paper>
  );
};
