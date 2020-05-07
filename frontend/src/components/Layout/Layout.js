import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './style'
import useData from './hooks'

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Layout(props) {
  const {children} = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const classes = useStyles(theme);
  const notebooks = useData()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashbook Project 1
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            {['Dashboard'].map((text, index) => (
              <ListItemLink href="/dashboard" key="index">
                <ListItemIcon><DashboardIcon/></ListItemIcon>
                <ListItemText primary={text} /> 
              </ListItemLink>
            ))}
        </List>
        <Divider />
        <List>
              {notebooks.map((notebook, index) => (
                <ListItemLink key={index} href={`/${notebook.nbname}`} >
                  <ListItemIcon><LibraryBooksIcon/></ListItemIcon>
                  <ListItemText primary={notebook.nbname} />
                </ListItemLink>
              ))}
            </List>
        <Box>
          <Divider/>
          <List >
            <ListItem button>
              <ListItemIcon>
                <LibraryAddIcon/>
              </ListItemIcon>
              <ListItemText primary="Add New Notebook"/>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}