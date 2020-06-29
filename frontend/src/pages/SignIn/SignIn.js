import React, { useState, useContext } from 'react';
import { userContext, languageContext, roleContext, loginContext } from '../../store';
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

//COMPONENT
function SignIn(props) {
  //styles
  const classes = useStyles();

  //localization
  const [t, i18n] = useTranslation()
  function handleLanguage(e){
    i18n.changeLanguage(e.target.value)
    // setLanguage(e.target.value)
  }

  //global states
  const [username, setUsername] = useContext(userContext)
  const [password, setPassword] = useState('')
  const [language, setLanguage] = useContext(languageContext)
  const [role, setRole] = useContext(roleContext)
  const [isLoggedIn, setIsLoggedIn] = useContext(loginContext)

  //to signin into database
  function handleSubmit(e){
    e.preventDefault()
    const localhost = 'http://127.0.0.1:5000'
    const endpoint = '/api/signin'
    const url = `${localhost}${endpoint}`
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            un: username,
            pw: password,
        })
    }
    fetch(url, requestOptions)
    .then(response => response.json())
    .then( data => {
      if (data.username){
        setUsername(data.username)
        setRole(data.role)
        setLanguage(data.language)
        setIsLoggedIn(true)
        Cookies.set('isLoggedIn', true)
        Cookies.set('username', data.username)
        Cookies.set('role',data.role)
        Cookies.set('language', data.language)
        if (data.role === 'analyst'){
          props.history.push('/dashboard')
        } else if (data.role === 'manager'){
          props.history.push('/users')
        }
      } else {
        alert(data.error)
        //using high-order-component withRouter in order to pass props.history
        props.history.push('/signin')
      }
    }).catch(error => {
      alert("login error: incorrect username and password")
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signin.signin')}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            autoComplete="fname"
            // name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label={t('signin.username')}
            // autoFocus
            value = {username}
            onChange = {(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('signin.password')}
            type="password"
            id="password"
            autoComplete="current-password"
            value = {password}
            onChange = {e => {setPassword(e.target.value)}}
          />
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-lang">{t('signin.language')}</InputLabel>
              <Select
                labelId="select-lang"
                id="lang"
                // value={language}
                onChange={handleLanguage}
              >
                <MenuItem value={'english'}>{t('signin.english')}</MenuItem>
                <MenuItem value={'bahasa'}>{t('signin.bahasa')}</MenuItem>
                <MenuItem value={'hindi'}>{t('signin.hindi')}</MenuItem>
              </Select>
              <FormHelperText>{t('signin.optional')}</FormHelperText>
            </FormControl>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t('signin.signin')}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {t('signin.dont')}
              </Link>
            </Grid>
          </Grid>
        </form>
        {/* <Typography variant="subtitle2" >Manager login</Typography>
        <Typography variant="caption" >username: manager, password: password</Typography>
        <Typography variant="subtitle2" >Analyst login</Typography>
        <Typography variant="caption" >username: user, password: pass</Typography> */}
      </div>
    </Container>
  );
}

export default withRouter(SignIn)