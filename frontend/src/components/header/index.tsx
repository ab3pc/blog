import React from 'react';
import Button from '@mui/material/Button';

import styles from './header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authActions } from 'store/actions';

const Header = () => {
  const { user } = useAppSelector(({auth}) => ({
    user: auth.user
  }));
  const dispatch = useAppDispatch();
  const hasUser = Boolean(user);

  const onClickLogout = () => {
    dispatch(authActions.logout());
  };
 
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>My BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {hasUser ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Write an article</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export { Header };