import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import TitleIcon from '@material-ui/icons/Title';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  multitextfield: {
     '& .MuiTextField-root': {
       margin: theme.spacing(1),
       width: '50ch',
     },
   },
   
}));

export default function NotebookPythonScript() {
  const classes = useStyles();

  return (
    <div>
        <Grid item xs={12} sm={12}>
			<div>
				<div align="left" className={classes.multitextfield}>
					<TextField
						id="pythonscript"
						label="Python Script"
						placeholder="Enter python script"
						multiline
						rows={8}
						variant="outlined"
						 />
				</div>
		
				<div align="right">
					<IconButton color="primary" aria-label="add key value pair">
					<AddIcon  fontSize="large" />
					</IconButton>
				</div>
				<div align="right">
					<IconButton color="primary" aria-label="add text">
					<TitleIcon  fontSize="large" />
					</IconButton>
				</div>
				<div align="right">
					<IconButton color="primary" aria-label="add python script">
					<CreateIcon  fontSize="medium" />
					</IconButton>
				</div>	
			</div> 
        </Grid>
    </div>
  );
}
