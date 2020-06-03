import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import useUsers from './hooks';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const users = useUsers()

  return (
    <div className={classes.root} style={{marginTop: 40}}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
