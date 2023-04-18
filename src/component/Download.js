import { useState, useEffect } from "react"
import { observer } from 'mobx-react';

import DownloadStore from '@/app/downloadStore';
import { SmallText, NoTextTransform } from '../config/ThromeConfig';
import { buildClassMethods } from '@/utils/ClassUtils';

import { DialogTitle, Dialog, Button, ButtonGroup, Switch, TextField, Checkbox } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import '@/component/Download.css';

const Download = observer((props) => {

  const [downloadStore] = useState(() => {
    let store = new DownloadStore();
    buildClassMethods(DownloadStore.prototype, store);
    return store;
  })

  useEffect(() => {
    downloadStore.loadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { downloadList, logs, startDownload, changeChecked, changeText, markAllReadWithSameKeyword } = downloadStore;
  const { open, setOpen } = props;
  console.log('render download');

  return (
    <Dialog open={open} maxWidth={'1'}>
      <DialogTitle>Download It!</DialogTitle>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Checked</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Skip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {downloadList.map((row, index) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell><Checkbox defaultChecked={row.checked} onChange={(e) => changeChecked(index, 'checked', e)} variant="outlined" /></TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell><TextField defaultValue={row.from} size="small" sx={SmallText} variant="outlined" /></TableCell>
                <TableCell><TextField defaultValue={row.to} onChange={(e) => changeText(index, 'to', e)} size="small" sx={SmallText} variant="outlined" /></TableCell>
                <TableCell><Switch checked={row.skip} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='console'>
        {logs.map(log => <div key={log}>{log}</div>)}
      </div>
      <div className='center'>
        <ButtonGroup variant="contained">
          <Button onClick={() => startDownload()} sx={NoTextTransform}>Download</Button>
          <Button onClick={() => markAllReadWithSameKeyword()} sx={NoTextTransform}>Sync</Button>
          <Button onClick={() => setOpen(false)} sx={NoTextTransform}>Close</Button>
        </ButtonGroup>
      </div>
    </Dialog>
  )

})

export default Download