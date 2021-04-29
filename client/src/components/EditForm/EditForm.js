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

const EditForm = ({ setIsEditing, currentIntention, setCurrentIntention, setIntentions }) => {
  const classes = useStyles();

  const onSave = useCallback(async (e) => {
    e.preventDefault();
    const updatedIntention = await updatePost(currentIntention.id, currentIntention);
    setCurrentIntention(updatedIntention.data);
    const intentions = await fetchPosts();
    await setIntentions(intentions.data);
    setIsEditing(false);
  }, [currentIntention]);

  return (
    <Paper classes={{ root: classes.paper }}>
      <FormControl classes={{ root: clsx(classes.root, classes.form) }}>
        <TextField
          required
          name="edit-title"
          variant="outlined"
          label="Title"
          value={currentIntention.title || ''}
          onChange={(e) => setCurrentIntention({ ...currentIntention, title: e.target.value })}
        />
        <TextField
          required
          name="edit-message"
          variant="outlined"
          label="Message"
          value={currentIntention.message || ''}
          onChange={(e) => setCurrentIntention({ ...currentIntention, message: e.target.value })}
        />
        <TextField
          name="edit-tags"
          variant="outlined"
          label="Tags"
          value={currentIntention.tags || ''}
          onChange={(e) => setCurrentIntention({ ...currentIntention, tags: e.target.value })}
        />
        <section className={classes.buttonContainer}>
          <Button classes={{ root: clsx(classes.button, classes.submitBtn) }} variant="contained" color="primary" size="medium" type="submit" onClick={onSave} disabled={!currentIntention.title || !currentIntention.message}>Save</Button>
          <Button classes={{ root: classes.button }} variant="outlined" color="primary" size="medium" onClick={() => setIsEditing(false)}>Cancel</Button>
        </section>
      </FormControl>
    </Paper>
  )
};

EditForm.propTypes = {
  currentIntention: PropTypes.object,
  setCurrentIntention: PropTypes.func,
  setIsEditing: PropTypes.func,
  setIntentions: PropTypes.func,
};

EditForm.defaultProps = {
  currentIntention: {},
  setCurrentIntention: () => null,
  setIsEditing: () => null,
  setIntentions: () => null,
};

export default EditForm;