import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 5,
    marginTop: theme.spacing(4.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar classes={{ root: classes.appBar }} position="static" color="inherit">
      <Typography variant="h2" align="center">Intention Box</Typography>
    </AppBar>
  )
}

export default NavBar;