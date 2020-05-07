import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../../css/Dashboard.css'
import { CardHeader, Drawer, responsiveFontSizes } from '@material-ui/core';
import {setCount} from '../../reducers/count/actions';
import stores from '../../stores';
import axios from 'axios'

const useStyles = makeStyles(()=>({
  root: {
    width: 800,
    height: 400,
    fontSize: 10,
    marginLeft:300,
  },
  table: {
   marginTop:100
  },
  formControl: {
    minWidth: 100,
  },
  selectEmpty: {
  },
}));
export default function MediaCard() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [open_db, setOpen_db] = React.useState(false);
  const [data,setData] = React.useState([])
  let shareLink = window.location.href;
  const [fields, setFields] = React.useState([{ value: null }]);
  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
    stores.dispatch(setCount(values.length));
   
  }
 
  React.useEffect(() =>{
    fetch('http://3.17.63.183:5000/notebooklist',)
    .then(response => response.json())
    .then(data => setData(data));
  },[]);
  
  var temp;
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value; 
    temp = event.target.value;
    var idx = "X-"+(i+1);
    document.getElementById(idx).innerHTML = temp;
    setFields(values);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen_db = () => {
    setOpen_db(true);
  };
  const handleClose_db = () => {
    setOpen_db(false);
  };

  const handleConnect = () => {
    setOpen_db(false);
  };


  
  return (
    <div>
      <table width="100%"  className = {classes.table}>
        <tr>
        {fields.map((field, idx) => 
        {
							return (
                <tr>
                  <td>
                  <Card className={classes.root} key={`${field}-${idx}`}>
                  <table width="100%">
                    <tr>
                    <td align="left" valign="top" width="35%" style={{color:'gray'}}>
                      Notebook-{idx + 1}
                    </td>
                    <td align="right" id={`X-${idx+1}`}></td>
                    <td align="right" valign="top">
                      <Button style={{fontSize:10}} onClick={()=>handleClickOpen_db()} color="primary">Connect to database</Button>
                    </td>
                    </tr>
                      <Dialog open={open_db} onClose={handleClose_db}>
                        <DialogContent>
                          <DialogContentText>
                              <Grid container spacing={2} alignItems="flex-end">
                                  <Grid item>Notebook:</Grid>
                                  <Grid item>
                                    <FormControl className={classes.formControl}>
                                    <Select style={{fontSize:'10px'}} displayEmpty className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }}>
                                      <MenuItem disabled style={{fontSize:'10px'}}>select notebook</MenuItem>
                                      {data.map((item)=>{
                                        return(
                                          <MenuItem style={{fontSize:'10px'}} value={item.nbname}>{item.nbname}</MenuItem>
                                        )
                                      })}
                                    </Select>
                                    </FormControl>
                                  </Grid>
                                  </Grid>
                                  <Grid container spacing={2} alignItems="flex-end">
                                  <Grid item>Visualization:</Grid>
                                  <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <Select style={{fontSize:'10px'}}
                                          id={field.value || ""}
                                          value={fields.text}
                                          onChange={e => handleChange(idx, e)}
                                          displayEmpty
                                          inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                          <InputLabel style={{ fontSize:'10px' }}>select visualization</InputLabel>
                                          <MenuItem value={"Linear Graph"} style={{fontSize:'10px'}}>Linear Graph</MenuItem>
                                          <MenuItem value={"Bar Graph"} style={{fontSize:'10px'}}>Bar Graph</MenuItem>
                                          <MenuItem value={"Tabular View"} style={{fontSize:'10px'}}>Tabular View</MenuItem>
                                          <MenuItem value={"Histogram"} style={{fontSize:'10px'}}>Histogram</MenuItem>
                                          <MenuItem value={"Pie Chart"} style={{fontSize:'10px'}}>Pie Chart</MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                </Grid>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleConnect} color="primary">Connect</Button>
                          <Button onClick={handleClose_db} color="primary">Close</Button>
                        </DialogActions>
                      </Dialog>
                  </table>
                    <Divider/>
                  </Card>
                  </td>
              </tr>
            );         
          })}
        <td width="5%" rowSpan="10" valign="top">
          <List>
            <ListItem>
              <Button><AddCircleIcon style={{fontSize: '30'}} onClick={() => handleAdd()}/></Button>
            </ListItem>
            <ListItem>
              <Button onClick={handleClickOpen}><ShareIcon style={{fontSize: '30'}}/></Button>
              <Dialog open={open} onClose={handleClose}>
                  <DialogContent>
                    <DialogContentText>
                        <b style={{color:'black'}}>This dashboard will be shared via a public link.</b><br/>
                      Audience with this link will have a view access to all the notebooks.
                        <Grid container spacing={0} alignItems="flex-end">
                            <Grid item>
                              <TextField id="input-with-icon-grid" label={shareLink} disabled/>
                            </Grid>
                            <Grid item>
                            <CopyToClipboard text={shareLink} >
                              <FileCopyIcon style={{cursor:'pointer'}} onClick={()=>alert("Copied")}/>
                            </CopyToClipboard>
                            </Grid>
                          </Grid>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                  </DialogActions>
              </Dialog>
            </ListItem>
          </List>  
        </td>
        </tr>
    </table>
    </div>
  );
}
