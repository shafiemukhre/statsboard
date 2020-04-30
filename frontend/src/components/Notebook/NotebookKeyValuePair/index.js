import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function NotebookKeyValuePair() {
  const [fields, setFields] = useState([{ value: null }]);
  
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
    return (
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
    );
}