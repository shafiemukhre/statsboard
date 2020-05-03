import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, {Component, useState } from 'react';
import { Grid } from '@material-ui/core';
import ReactDOM from "react-dom";

import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class NotebookKeyValuePair extends Component {

constructor(props){
    
    super(props);
    this.state={
        key:"",
        value:""

    }

    this.onKeyChange = this.onKeyChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

}

onKeyChange(e) {
    this.setState({
      key: e.target.value
    });
  }
  onValueChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  onSubmit(e) {
    
    const data={

        key:this.state.key,
        value:this.state.value
    }
    const rooturl="localhost";
    // console.log(data.key)
    // console.log(data.value)

    axios
        .post("http://" + rooturl + ":5000/Notebook", data)
        .then(response=>{
            console.log("response",response)
        })
  }

  render(){

    const useStyles = makeStyles((theme) => ({
        multitextfield: {
           '& .MuiTextField-root': {
             margin: theme.spacing(1),
             width: '25ch',
           },
         },
         
      }));

    return(

        <div  className="multitextfield">

            <Grid item xs={12} sm={12}>
            <div align="left">
                  <TextField
                    onChange={this.onKeyChange}
                    type="text"
                    label="key"
                    placeholder="Enter Key"
                    variant="outlined"
                  />

                <TextField
                    onChange={this.onValueChange}
                    type="text"
                    label="value"
                    placeholder="Enter Value"
                    variant="outlined"
                  />  

                
                <Button
                  type="button"
                  onClick={this.onSubmit}
                  variant="contained" color="primary"
                >
                  Insert
                </Button>
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

            </Grid>
        </div>
    )
  }

//    handleChange(i, event) {
//     const values = [...fields];
//     values[i].value = event.target.value;
//     setFields(values);
//     this.setState({
//         key
//     })
//   }

//    handleAdd() {
//     const values = [...fields];
//     values.push({ value: null });
//     setFields(values);
//   }

//    handleRemove(i) {
//     const values = [...fields];
//     values.splice(i, 1);
//     setFields(values);
//   }

//   return (
//     <div>
//         <Grid item xs={12} sm={12}>
// 			<div>
// 				<div align="left">
// 							{fields.map((field, idx) => {
// 							return (
// 							  <div key={`${field}-${idx}`}>
// 								 <TextField
// 								id={field.value || ""}
// 								label="Key"
// 								placeholder="Enter key"
// 								multiline
// 								variant="outlined"
// 								onChange={e => handleChange(idx, e)}
// 								 />

// 								<TextField
// 								id={field.value || ""}
// 								label="Value"
// 								placeholder="Enter value"
// 								multiline
// 								variant="outlined"
// 								onChange={e => handleChange(idx, e)}
// 								 />
								 
// 								<IconButton color="primary" aria-label="remove field" onClick={() => handleRemove(idx)}>
// 									<CloseIcon  fontSize="small" />
// 								</IconButton>
// 							  </div>
// 							);
// 							})}
						
// 				</div>

// 				<div align="right">
// 					<IconButton color="primary" aria-label="add key value pair" onClick={() => handleAdd() }>
// 					<AddIcon  fontSize="large" />
// 					</IconButton>
// 				</div>
// 				<div align="right">
// 					<IconButton color="primary" aria-label="add text">
// 					<TitleIcon  fontSize="large" />
// 					</IconButton>
// 				</div>
// 				<div align="right">
// 					<IconButton color="primary" aria-label="add python script">
// 					<CreateIcon  fontSize="medium" />
// 					</IconButton>
// 				</div>	
// 			</div> 
//         </Grid>
//     </div>
//   );
}


// const rootElement = document.getElementById("root");
// ReactDOM.render(<NotebookKeyValuePair />, rootElement);

