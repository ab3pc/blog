import React, { FC } from "react";

import { Post } from "../components/post";
import { Index } from "../components/add-comment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams, useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { postsActions } from "store/actions";
import { DataStatus } from "common/enums/enums";

export const FullPost: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { post, dataStatus } = useAppSelector(({posts}) => ({
    post: posts.post,
    dataStatus: posts.dataStatus,
  }))
  const isLoading = dataStatus === DataStatus.PENDING;

  useEffect(() => {
    dispatch(postsActions.getPost(String(id)));
  },[dispatch, id]);

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
  return (
    <>
      <Post
        id={post?._id}
        title="Roast the code #1 | Rock Paper Scissors"
        imageUrl= {post?.imageUrl}
        user={post?.author}
        createdAt={post?.createdAt}
        viewsCount={post?.viewsCount}
        commentsCount={3}
        tags={post?.tags}
        isFullPost
      >
        {post && <p>
          { post?.text}
        </p>}
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
