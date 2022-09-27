import React, { FC } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Post } from '../components/post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { postsActions } from 'store/actions';
import { DataStatus } from 'common/enums/enums';

export const Home:FC = () => {

  const dispatch = useAppDispatch();
  const { posts, dataStatus, tags } = useAppSelector(({posts}) => ({
    posts: posts.posts,
    tags: posts.tags,
    dataStatus: posts.dataStatus,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;

  useEffect(() => {
    dispatch(postsActions.getPosts());
    dispatch(postsActions.getTags());

  },[]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>

          { (isLoading ? [...Array(5)]: posts).map((post) => ( isLoading ? <Post isLoading={isLoading}/>:
            <Post
              id={post._id}
              title={post.title}
              imageUrl={post.imageUrl}
              user={post.author}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={3}
              tags={post.tags}
              isEditable
             
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags} isLoading={isLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
