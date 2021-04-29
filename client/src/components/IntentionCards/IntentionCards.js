import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import IntentionCard from '../IntentionCard/IntentionCard';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const IntentionCards = ({ intentions, setIntentions }) => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      {intentions.map((intention) => (
        <IntentionCard
          intention={intention}
          key={intention._id}
          setIntentions={setIntentions}
        />
      ))}
    </section>
  )
}

IntentionCards.propTypes = {
  intentions: PropTypes.array,
  setIntentions: PropTypes.func,
};

IntentionCards.defaultProps = {
  intentions: [],
  setIntentions: () => null,
};

export default IntentionCards;