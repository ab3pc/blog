import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, DataStatus, ENV } from 'common/enums/enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { postsActions } from 'store/actions';
import { Spinner } from 'components';

export const AddPost = () => {
  const { user, postDataStatus } = useAppSelector(({auth, posts}) => ({
    user: auth.user,
    postDataStatus: posts.dataStatus
  }));
  const dispatch = useAppDispatch();
  const hasUser = Boolean(user);
  const isLoading = postDataStatus === DataStatus.PENDING;
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { payload } = await dispatch(postsActions.uploadImage({file: formData}))
      setImageUrl(payload.url);
    } catch (error) {
      console.warn(error.message);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const handlePublish = async () => {
    const allTags = tags.split(' ');
    
     const data = {
      title,
      text:value,
      tags: allTags,
    };
    if(imageUrl) {
      data.imageUrl = `${ENV.API_PATH}${imageUrl}`;
    }
    console.log(data);
    await dispatch(postsActions.createPost(data)).unwrap().then(() => navigate(AppRoute.ROOT));
  }

  if(!hasUser) {
    return <Navigate to={AppRoute.ROOT}/>
  }

  if(isLoading) {
    return <Spinner isOverflow/>
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button 
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large">
        Upload image
      </Button>
      <input
        ref = {inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
        <img className={styles.image} src={`${ENV.API_PATH}${imageUrl}`} alt="Uploaded" />
        </>
        
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField 
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="tags"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        
        />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button
          size="large"
          variant="contained"
          onClick={handlePublish}
          >
          Publish
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
