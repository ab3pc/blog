import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { UserRegisterRequestDto } from 'common/types/types';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { AppRoute, DataStatus } from 'common/enums/enums';
import { Navigate, Spinner } from 'components';

const Registration: FC = () => {
  const dispatch = useAppDispatch();
  const { user, dataStatus } = useAppSelector(({auth}) => ({
    user: auth.user,
    dataStatus: auth.dataStatus
  }));
  const isLoading = dataStatus === DataStatus.PENDING;
  const hasUser = Boolean(user);

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullName:'',
      email: '',
      password:''
    },
    mode: 'onChange',
  });

  const onSubmit = (payload: UserRegisterRequestDto): void => {
    dispatch(authActions.register(payload));  
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
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField className={styles.field} label="Full name" fullWidth
        {...register('fullName', {required: 'Enter full name'})}
        error={Boolean(errors?.fullName?.message)}
        helperText= {errors?.fullName?.message}
      />
      <TextField className={styles.field} label="E-Mail" fullWidth
        {...register('email', {required: 'Enter email'})}
        error={Boolean(errors?.email?.message)}
        helperText= {errors?.email?.message}
      />
      <TextField className={styles.field} label="Password" fullWidth
         {...register('password', {required: 'Enter password'})}
         error={Boolean(errors?.password?.message)}
         helperText= {errors?.password?.message}
      />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Register
      </Button>
      </form>
      
    </Paper>
  );
};

export { Registration };
