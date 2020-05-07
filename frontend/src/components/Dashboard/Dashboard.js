import React from 'react';
import { Grid, Box } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
<<<<<<< HEAD
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
=======

import MediaCard from './MediaCard/MediaCard';
import useDashboardData from './hooks';
import Tabular from './Tabular/Tabular';

export default function Dashboard(){
    const [open, setOpen] = React.useState(false);
    let shareLink = window.location.href;
>>>>>>> master

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

    const datas = useDashboardData()

    return (
        <div style={{marginTop: 40}}>
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

            <Grid container>
                <Grid item xs={false} md={1} ></Grid>
                <Grid item xs ={12} md={10}>
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        {datas.map((data, i) => (
                            <Box key={i} p={1}>
                                <MediaCard nbname={data.nbname} key={i}/>
                                {/* <Tabular key={i}/> */}
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={false} md={1}></Grid>
            </Grid>
        </div>
    )
}
