import React, { useState } from 'react';
import { makeStyles, Grid, TextField, IconButton } from '@material-ui/core';

//import icons
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import TitleIcon from '@material-ui/icons/Title';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	multitextfield: {
		'& .MuiTextField-root': {
		margin: theme.spacing(1),
		width: '25ch',
		},
	},
	topOffset: {
		marginTop: 100
	},
}));

export default function Notebook() {
  const classes = useStyles();
  const [fields, setFields] = useState([{ value: null }]);

//   const [value, setValue] = React.useState('Controlled');

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

    return (
		<div className={classes.topOffset}>
			<Grid item xs={12} sm={12}>
				<div>
					<div align="left">
						{fields.map((field, idx) => {
						return (
							<div key={`${field}-${idx}`}>
								<TextField
							id={field.value || ""}
							label="Key"
							placeholder="Enter key"
							multiline
							variant="outlined"
							onChange={e => handleChange(idx, e)}
								/>

							<TextField
							id={field.value || ""}
							label="Value"
							placeholder="Enter value"
							multiline
							variant="outlined"
							onChange={e => handleChange(idx, e)}
								/>
								
							<IconButton color="primary" aria-label="remove field" onClick={() => handleRemove(idx)}>
								<CloseIcon  fontSize="small" />
							</IconButton>
							</div>
						);
						})}						
					</div>
					<div align="right">
						<IconButton color="primary" aria-label="add key value pair" onClick={() => handleAdd() }>
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