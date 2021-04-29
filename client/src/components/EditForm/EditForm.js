import React, { useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, FormControl } from '@material-ui/core';

import { updateIntention, fetchIntentions } from '../../api';

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

  const onChange = useCallback((e) => setCurrentIntention({ ...currentIntention, [e.target.name]: e.target.value }), [setCurrentIntention, currentIntention]);

  const onSave = useCallback(async (e) => {
    e.preventDefault();
    const updatedIntention = await updateIntention(currentIntention.id, currentIntention);
    setCurrentIntention(updatedIntention.data);
    const intentions = await fetchIntentions();
    await setIntentions(intentions.data);
    setIsEditing(false);
  }, [currentIntention]);

  return (
    <Paper classes={{ root: classes.paper }}>
      <FormControl classes={{ root: clsx(classes.root, classes.form) }}>
        <TextField
          required
          name="title"
          variant="outlined"
          label="Title"
          value={currentIntention.title || ''}
          onChange={(e) => onChange(e)}
        />
        <TextField
          required
          name="message"
          variant="outlined"
          label="Message"
          value={currentIntention.message || ''}
          onChange={(e) => onChange(e)}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          value={currentIntention.tags || ''}
          onChange={(e) => onChange(e)}
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