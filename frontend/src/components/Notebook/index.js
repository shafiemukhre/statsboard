import React from 'react';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import TitleIcon from '@material-ui/icons/Title';
import IconButton from '@material-ui/core/IconButton';

export default function Notebook() {

  return (
    <div>
        <Grid item xs={12} sm={12}>
			<div>
				<paper>
					Notebook-1
				</paper>
			</div> 
			<div>
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

