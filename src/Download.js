import React, { Component } from 'react'
import { DialogTitle, Dialog, Button,ButtonGroup, Switch, TextField,Checkbox } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {ButtonNormal, TextSmall} from './InputStyles';

import Paper from '@mui/material/Paper';
import HttpClient from './HttpClient';

import './Download.css';

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openFlag: false,
            downloadList: []
        };
    }

    componentDidMount() {
        this.loadConfig()
    }

    async loadConfig() {
        let config = await HttpClient.getJSON('downloadConfig.json');
        if (!config.success) {
            console.log('Fail to load download config');
            return;
        }
        let downloadList = config.data.map(item => ({ ...item, checked:false, from: 1, to: 1000 ,skip:true}));
        this.setState({ downloadList })
    }

    startDownload() {
        //start to download from remote server.
    }

    open() {
        this.setState({ openFlag: true })
    }

    close() {
        this.setState({ openFlag: false })
    }

    changeRow(index, keyName, e) {
        let value = e.target.value;
        this.setState((state) => {
            let { downloadList } = state;
            downloadList = [...downloadList].map((item, i) => index == i ? { ...item, [keyName]: value } : item);
            return { downloadList }
        })
    }

    render() {
        const { openFlag, downloadList } = this.state;
        return (
            <Dialog onClose={()=>false} open={openFlag}>
                <DialogTitle>Set backup account</DialogTitle>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Checked</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Skip</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {downloadList.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell><Checkbox  value={row.checked} onChange={(e) => this.changeRow(index, 'checked', e)} variant="outlined"/></TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell><TextField value={row.from} onChange={(e) => this.changeRow(index, 'from', e)} sx={TextSmall} variant="outlined"/></TableCell>
                                    <TableCell><TextField value={row.to} onChange={(e) => this.changeRow(index, 'to', e)} sx={TextSmall} variant="outlined"/></TableCell>
                                    <TableCell><Switch checked={row.skip} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className='center'>
                    <ButtonGroup variant="contained" color='warning'>
                        <Button onClick={() => this.startDownload()} sx={ButtonNormal}>Download</Button>
                        <Button onClick={() => this.close()} sx={ButtonNormal}>Close</Button>
                    </ButtonGroup>
                </div>
            </Dialog>
        )
    }

}

export default Download