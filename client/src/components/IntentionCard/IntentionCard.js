import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Card, Typography, CardHeader, IconButton, CardActions, CardContent, Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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

const IntentionCard = ({ post, id, setPosts }) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const onRemoveCard = useCallback(async () => {
    await deletePost(id);
    const posts = await fetchPosts();
    setPosts(posts.data);
  }, []);

  const onEditCard = useCallback(() => {
    setIsEditing(true);
    setCurrentPost({ id: id, title: post.title, message: post.message, tags: post.tags });
  }, []);

  return (
    <Card variant="outlined" classes={{ root: classes.card }}>
      <CardActions classes={{ root: classes.deleteIcon }}>
        <Button endIcon={<EditIcon className={classes.editIcon} />} classes={{ root: classes.editBtn }} variant="contained" color="default" size="small" onClick={onEditCard}>Edit</Button>
        <IconButton aria-label="remove-card" onClick={onRemoveCard}>
          <HighlightOffIcon />
        </IconButton>
      </CardActions>
      {isEditing ? <EditForm setIsEditing={setIsEditing} setPosts={setPosts} currentPost={currentPost} setCurrentPost={setCurrentPost} /> : ''}
      <CardHeader
        title={post.title}
        subheader={post.tags}
        classes={{ subheader: classes.italic }}
      />
      <CardContent>
        <Typography>{post.message}</Typography>
      </CardContent>
    </Card>
  )
};

IntentionCard.propTypes = {
  post: PropTypes.object,
  id: PropTypes.string,
  setPosts: PropTypes.func,
};

IntentionCard.defaultProps = {
  post: {},
  id: '',
  setPosts: () => null,
};

export default IntentionCard;
