import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Paper, FormControl } from '@material-ui/core';

import { createPost, fetchPosts } from '../../api';

import IntentionCards from '../IntentionCards/IntentionCards';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '25%',
  },
  submitBtn: {
    backgroundColor: '#3d529b',
  },
}));

const Form = ({ posts, setPosts }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({});

  const onReset = useCallback((e) => {
    e.preventDefault();
    setPostData({ title: '', message: '', tags: '' });
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    await createPost(postData);
    const posts = await fetchPosts();
    setPosts(posts.data);
    onReset(e);
  }, [postData, posts]);

  return (
    <Paper classes={{ root: classes.paper }}>
      <FormControl classes={{ root: clsx(classes.root, classes.form) }}>
        <Typography variant="h6">Set an intention</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required
          value={postData.title || ''}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          required
          value={postData.message || ''}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          value={postData.tags || ''}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <section className={classes.buttonContainer}>
          <Button classes={{ root: clsx(classes.button, classes.submitBtn) }} variant="contained" color="primary" size="medium" type="submit" onClick={onSubmit} disabled={!postData.title || !postData.message}>Submit</Button>
          <Button classes={{ root: classes.button }} variant="contained" color="secondary" size="medium" onClick={onReset} disabled={!postData.title && !postData.message && !postData.tags}>Reset</Button>
        </section>
      </FormControl>
      <IntentionCards posts={posts} setPosts={setPosts} />
    </Paper>
  )
};

Form.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
};

Form.defaultProps = {
  posts: [],
  setPosts: () => null,
};

export default Form;