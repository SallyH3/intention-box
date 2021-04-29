import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Card, Typography, CardHeader, IconButton, CardActions, CardContent, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

import EditForm from '../EditForm/EditForm';
import { deletePost, fetchPosts } from '../../api/index';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1.5),
  },
  italic: {
    fontStyle: 'italic',
  },
  editBtn: {
    width: '10%',
    margin: theme.spacing(1),
  },
  editIcon: {
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(0.5),
  },
  deleteIcon: {
    justifyContent: 'flex-end',
  },
}));

const IntentionCard = ({ intention, setIntentions }) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [currentIntention, setCurrentIntention] = useState({});

  const onRemoveCard = useCallback(async () => {
    await deletePost(intention._id);
    const intentions = await fetchPosts();
    setIntentions(intentions.data);
  }, []);

  const onEditCard = useCallback(() => {
    setIsEditing(true);
    setCurrentIntention({ id: intention._id, title: intention.title, message: intention.message, tags: intention.tags });
  }, [setCurrentIntention, intention]);

  if (!isEditing) {
    return (
      <Card variant="outlined" classes={{ root: classes.card }}>
        <CardActions classes={{ root: classes.deleteIcon }}>
          <Button endIcon={<EditIcon className={classes.editIcon} />} classes={{ root: classes.editBtn }} variant="contained" color="default" size="small" onClick={onEditCard}>Edit</Button>
          <IconButton aria-label="remove-card" onClick={onRemoveCard}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardHeader
          title={intention.title}
          subheader={intention.tags}
          classes={{ subheader: classes.italic }}
        />
        <CardContent>
          <Typography>{intention.message}</Typography>
        </CardContent>
      </Card>
    )
  }
  return (
    <EditForm setIsEditing={setIsEditing} setIntentions={setIntentions} currentIntention={currentIntention} setCurrentIntention={setCurrentIntention} />
  )
};

IntentionCard.propTypes = {
  intention: PropTypes.object,
  setIntentions: PropTypes.func,
};

IntentionCard.defaultProps = {
  intention: {},
  setIntentions: () => null,
};

export default IntentionCard;
