import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { userContext, languageContext } from '../../../store';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  //props
  const { className, ...rest } = props;
  
  //styles
  const classes = useStyles();

  //context
  const [username, setUsername] = useContext(userContext)
  const [language, setLanguage] = useContext(languageContext)
  
  //localization
  const [t, i18n] = useTranslation()
  function handleLanguage(e){
    i18n.changeLanguage(e.target.value)
  }

  const [values, setValues] = useState({
    userName: 'shafiemukhre',
    email: 'username@email.com',
    phone: '',
    state: 'Alabama',
    country: 'Country'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const states = [
    {
      value: 'english',
      label: 'English'
    },
    {
      value: 'bahasa',
      label: 'Bahasa'
    },
    {
      value: 'hindi',
      label: 'Hindi'
    }
  ];

  const access = [
    {
      value: 'analyst',
      label: 'Analyst'
    },
    {
      value: 'manager',
      label: 'Manager'
    },
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader={t('profile.information')}
          title={t('profile.profile')}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={t('profile.specify')}
                label={t('profile.username')}
                margin="dense"
                name="userName"
                onChange={handleChange}
                required
                // value={username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label={t('profile.email')}
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                disabled //TODO: enable
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label={t('profile.phone')}
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
                disabled //TODO: remove disabled
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label={t('profile.language')}
                margin="dense"
                name="state"
                onChange={handleLanguage}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={language}
                variant="outlined"
              >
                <option value={'english'}>{t('profile.english')}</option>
                <option value={'bahasa'}>{t('profile.bahasa')}</option>
                <option value={'hindi'}>{t('profile.hindi')}</option>
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label={t('profle.country')}
                margin="dense"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
                disabled //TODO: remove disabled
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label={t('profile.access')}
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                // value={role}
                variant="outlined"
                disabled
              >
                <option value={'analyst'}>{t('profile.analyst')}</option>
                <option value={'manager'}>{t('profile.manager')}</option>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled //TODO: enable
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
