import React, { Component } from 'react'

import './Download.css';
import { DialogTitle, Dialog, Button, ButtonGroup, Switch, TextField, Checkbox } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

import { SmallText, NoTextTransform } from '../config/ThromeConfig';
import ConfigLoad from '../service/ConfigLoad';
import ContentParse from '../service/ContentParse';
import DataService from '../service/DataService';
import {HashCode} from '@/utils/Common';

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openFlag: false,
            downloadList: [],
            logs:["Log Console"]
        };
    }

    componentDidMount() {
        this.loadConfig()
    }

    async loadConfig() {
        let config = await ConfigLoad.loadDownloads();
        let { list = [], defaultRange= [1 , 10], filterOutKeywords = []} = config;
        let [from, to] = defaultRange;
        let downloadList = list.map(item => ({ ...item, checked: false, from, to, skip: true }));
        this.setState({ downloadList })
        this.filterOutKeywords = filterOutKeywords;
    }

    async startDownload() {
        //start to download from remote server.
        const { downloadList } = this.state;
        if(downloadList.length < 1) {
          this.buildLog(['Download list is required']);
          return;
        }
        let rules = await ConfigLoad.loadRules();
        let contentParse = new ContentParse(rules);
        const newLogs = ["Start job"];
        for (let item of downloadList) {
            if (!item.checked) {
                continue;
            }
            for (let i = item.from; i < item.to; i++) {
                let url = item.url.replace("{pageNo}", i);
                let { listingData = [] } = await contentParse.parse(url);
                this.mappingListingData(listingData, i);
                let insertCount = await DataService.createDetail(listingData, count => {
                  newLogs.push(`Download ${url}, count=${count}`)
                  DataService.createList({pageUrl:url});
                });
                if(insertCount === 0 && item.skip) {
                  break;
                }
            }
        }
        newLogs.push("Done.")
        this.showLogs(newLogs);
    }

    async mappingListingData(listingData, pageNo) {
      listingData.forEach(item => {
        let detailId = item.contentIds[0];
        item.detailId = detailId
        item.detailType = item.contentIds[1];
        item.detailOrder = /^[0-9]+$/.test(detailId) ? detailId: HashCode(detailId);
        item.detailTitle = item.title
        item.detailTitle = item.title
        item.detailUrl = item.url
        item.readFlag = 0;
        item.localFlag = 0;
        item.tagId = 0;
        item.pageNo = pageNo;
        item.keyword = '@@@@' 
      });
    }


    showLogs(newLogs) {
      this.setState(({logs})=>{
        logs = [...logs, ...newLogs, '---------------------------'];
        return {logs};
      });
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
            downloadList = [...downloadList].map((item, i) => index === i ? { ...item, [keyName]: value } : item);
            return { downloadList }
        })
    }

    render() {
        const { openFlag, downloadList, logs } = this.state;
        return (
            <Dialog onClose={() => false} open={openFlag} maxWidth={'1'}>
                <DialogTitle>Download It!</DialogTitle>
                <TableContainer component={Paper}>
                    <Table aria-label="table">
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
                                    <TableCell><Checkbox value={row.checked} onChange={(e) => this.changeRow(index, 'checked', e)} variant="outlined" /></TableCell>
                                    <TableCell>{row.url}</TableCell>
                                    <TableCell><TextField value={row.from} onChange={(e) => this.changeRow(index, 'from', e)} size="small" sx={SmallText} variant="outlined" /></TableCell>
                                    <TableCell><TextField value={row.to} onChange={(e) => this.changeRow(index, 'to', e)} size="small" sx={SmallText} variant="outlined" /></TableCell>
                                    <TableCell><Switch checked={row.skip} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className='console'>
                    {logs.map(log => <div>{log}</div>)}
                </div>
                <div className='center'>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => this.startDownload()} sx={NoTextTransform}>Download</Button>
                        <Button onClick={() => this.close()} sx={NoTextTransform}>Close</Button>
                    </ButtonGroup>
                </div>
            </Dialog>
        )
    }

}

export default Download