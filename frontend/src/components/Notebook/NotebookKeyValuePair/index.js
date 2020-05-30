import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import React, {Component, useState } from 'react';
import { Grid } from '@material-ui/core';
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import TitleIcon from '@material-ui/icons/Title';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const columnHeader =["id","key","value"];



const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: theme.palette.common.white,
	  color: theme.palette.primary.main,
	},
	body: {
	  fontSize: 14,
	},
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
	root: {
	  '&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	  },
	},
  }))(TableRow);



export default class NotebookKeyValuePair extends Component {

constructor(props){
    
    super(props);
    this.state={
        key:"",
        value:""

    }
	this.state = {items:[]};
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
	
	this.generateHeader = this.generateHeader.bind(this);
	this.generateTableData = this.generateTableData.bind(this);

	this.getData = this.getData.bind(this);
	
	
	}
	async componentDidMount() {
		const response = await axios.get('http://localhost:5000/notebooklist/Notebook');
		//const json = await response.json();
		console.log(response.data);
		this.setState({items:response.data});
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
    const rooturl="3.17.63.183";
    // console.log(data.key)
    // console.log(data.value)
	
    axios
        .post("http://" + rooturl + ":5000/Notebook", data)
        .then(response=>{
            console.log("response",response)
		})
	alert('Data Inserted');
	window.location.reload();
  }

//   getTableData=async() =>
//   {
// 		const rooturl="localhost";
// 		//const res = await axios.get("http://" + rooturl + ":5000/Notebook");
// 		//console.log(res);
// 		const res = [{'id' : '1', 'key' : '7', 'value' : '8'}, {'id' : '2', 'key' : '1', 'value' : '2'}];
// 		return this.state.res.map((record, index) => {
// 			const {id, key, value} = record
// 			return (
// 				<tr key={id}>
// 					<td>{id}</td>
// 					<td>{key}</td>
// 					<td>{value}</td>
// 				</tr>
// 			)
// 		})
//   }

generateHeader(){
	let res=[];
  for(var i =0; i < columnHeader.length; i++){
	  res.push(<StyledTableCell key={columnHeader[i]}>{columnHeader[i]}</StyledTableCell>)
  }
  return res;
}

getData=async() => {
	
	const rooturl="localhost";
	const tableData = await axios.get("http://" + rooturl + ":5000/Notebook");
	let res = tableData.data;
	//console.log(tableData['data']);
	let tableData1 = [[1, "7", "8"], [2, "1", "2"], [3, "3", "4"], [4, "11", "12"], [5, "12", "24"]];
	console.log(tableData1);
	//let res = [];
	let temp = tableData['data'];
	let t1 = [];
	let t2 = [];
	for (var i =0; i < temp.length; i++)
	{
		for(var j=0;j<temp[i].length;j++)
		{
			t2.push(temp[i][j]);
		}
		t1.push(t2);
		t2 = [];
	}
	//console.log(t1);
	/*for(var i =0; i < t1.length; i++){
		res.push(
		 <tr  >
		<td  id={t1[i][0]}>{t1[i][0]}</td >
		<td  id={t1[i][1]}>{t1[i][1]}</td>
		<td  id= {t1[i][2]}>{t1[i][2]}</td>
		</tr >
		)
	}*/
	this.setState({
		Res: res.map((t,i) =>( 
			<div>{t}</div>))
	});
	return this.state.Res;

}

generateTableData() {
	let res=[];

	let tableData = this.getData();
	console.log(tableData);
	//let tableData = [[1, "7", "8"], [2, "1", "2"], [3, "3", "4"], [4, "11", "12"], [5, "12", "24"]];//[{'id' : '1', 'key' : '1', 'value' : '2'},{'id' : '2', 'key' : '3', 'value' : '2'}];
	for(var i =0; i < tableData.length; i++){
		res.push(
		 <StyledTableRow  >
		<StyledTableCell  key={tableData[i][0]}>{tableData[i][0]}</StyledTableCell >
		<StyledTableCell  key={tableData[i][1]}>{tableData[i][1]}</StyledTableCell >
		<StyledTableCell  key= {tableData[i][2]}>{tableData[i][2]}</StyledTableCell >
		</StyledTableRow >
		)
	}
	return res;
}


  render(){

	const { hits } = this.state;
    const useStyles = makeStyles((theme) => ({
        multitextfield: {
           '& .MuiTextField-root': {
             margin: theme.spacing(1),
             width: '25ch',
           },
         },
		 
		 table: {
			minWidth: 700,
		  },

	  }));
	  



    return(

        <div  className="multitextfield">

			<div>
			<TableContainer component={Paper}>
				<Table className="table" aria-label="customized table">
					<TableHead>
						<TableRow>
						{this.generateHeader()}
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.items.map(hit =>
						<TableRow>
							<TableCell>{hit.id}</TableCell>
							<TableCell>{hit.key}</TableCell>
							<TableCell>{hit.value}</TableCell>
						</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			</div>


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
