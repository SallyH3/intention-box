import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import IntentionCard from '../IntentionCard/IntentionCard';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
  },
}));

const IntentionCards = ({ posts, setPosts }) => {
  const classes = useStyles();

  return (
    !posts ? <CircularProgress /> : (
      <section className={classes.container}>
        {posts.map((post) => (
          <IntentionCard
            post={post}
            id={post._id}
            key={post._id}
            setPosts={setPosts}
          />
        ))}
      </section>
    )
  )
}

IntentionCards.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
};

IntentionCards.defaultProps = {
  posts: [],
  setPosts: () => null,
};

export default IntentionCards;