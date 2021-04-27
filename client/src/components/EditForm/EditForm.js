import React, { useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, FormControl } from '@material-ui/core';

import { updatePost, fetchPosts } from '../../api';

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

const EditForm = ({ setIsEditing, currentPost, setCurrentPost, setPosts }) => {
  const classes = useStyles();

  const onSave = useCallback(async (e) => {
    e.preventDefault();

    const updatedPost = await updatePost(currentPost.id, currentPost);
    setCurrentPost(updatedPost.data);
    const posts = await fetchPosts();
    setPosts(posts.data);
    setIsEditing(false);
  }, []);

  return (
    <Paper classes={{ root: classes.paper }}>
      <FormControl classes={{ root: clsx(classes.root, classes.form) }}>
        <TextField
          name="edit-title"
          variant="outlined"
          label="Title"
          value={currentPost.title || ''}
          onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
        />
        <TextField
          name="edit-message"
          variant="outlined"
          label="Message"
          value={currentPost.message || ''}
          onChange={(e) => setCurrentPost({ ...currentPost, message: e.target.value })}
        />
        <TextField
          name="edit-tags"
          variant="outlined"
          label="Tags"
          value={currentPost.tags || ''}
          onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value })}
        />
        <section className={classes.buttonContainer}>
          <Button classes={{ root: clsx(classes.button, classes.submitBtn) }} variant="contained" color="primary" size="medium" type="submit" onClick={onSave}>Save</Button>
          <Button classes={{ root: classes.button }} variant="outlined" color="primary" size="medium" onClick={() => setIsEditing(false)}>Cancel</Button>
        </section>
      </FormControl>
    </Paper>
  )
};

EditForm.propTypes = {
  currentPost: PropTypes.object,
  setCurrentPost: PropTypes.func,
  setIsEditing: PropTypes.func,
};

EditForm.defaultProps = {
  currentPost: {},
  setCurrentPost: () => null,
  setIsEditing: () => null,
};

export default EditForm;