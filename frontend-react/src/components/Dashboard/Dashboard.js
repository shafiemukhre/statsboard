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

import useDashboardData from './hooks';
import MediaCard from './MediaCard'
import Tabular from './Tabular/Tabular';
import LineChart from './LineChart'

export default function Dashboard(){
    const [open, setOpen] = React.useState(false);
    let shareLink = window.location.href;

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
                        {/* {datas.map((data, i) => {
                            if (data.graphtype === 'Linear Graph'){
                                return(
                                    <Box key={i} p={1}>
                                        <MediaCard nbname={data.nbname} key={i}/>
                                    </Box>
                                )
                            } else if (data.graphtype === 'Tabular View'){
                                return(
                                    <Box key={i} p={1}>
                                        <Tabular key ={i}/>
                                    </Box> 
                                )
                            }
                        })} */}
                        <Box p={1}>
                            <MediaCard>
                                <LineChart/>
                            </MediaCard>
                        </Box> 
                        <Box p={1}>
                            <MediaCard>
                                <Tabular/>
                            </MediaCard>
                        </Box> 
                    </Box>
                </Grid>
                <Grid item xs={false} md={1}></Grid>
            </Grid>
        </div>
    )
}
