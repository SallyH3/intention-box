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

const Form = ({ intentions, setIntentions }) => {
  const classes = useStyles();
  const [intention, setIntention] = useState({});

  const onReset = useCallback((e) => {
    e.preventDefault();
    setIntention({ title: '', message: '', tags: '' });
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    await createPost(intention);
    const intentions = await fetchPosts();
    setIntention(intentions.data);
    onReset(e);
  }, [intention, intentions]);

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
          value={intention.title || ''}
          onChange={(e) => setIntention({ ...intention, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          required
          value={intention.message || ''}
          onChange={(e) => setIntention({ ...intention, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          value={intention.tags || ''}
          onChange={(e) => setIntention({ ...intention, tags: e.target.value })}
        />
        <section className={classes.buttonContainer}>
          <Button classes={{ root: clsx(classes.button, classes.submitBtn) }} variant="contained" color="primary" size="medium" type="submit" onClick={onSubmit} disabled={!intention.title || !intention.message}>Submit</Button>
          <Button classes={{ root: classes.button }} variant="contained" color="secondary" size="medium" onClick={onReset} disabled={!intention.title && !intention.message && !intention.tags}>Reset</Button>
        </section>
      </FormControl>
      <IntentionCards intentions={intentions} setIntentions={setIntentions} />
    </Paper>
  )
};

Form.propTypes = {
  intentions: PropTypes.array,
  setIntentions: PropTypes.func,
};

Form.defaultProps = {
  intentions: [],
  setIntentions: () => null,
};

export default Form;