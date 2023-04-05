import { useState } from 'react';

import './ActionButtons.css';
import Loading from './Loading';
import Download from './Download';

import { NoTextTransform } from '../config/ThromeConfig';
import { Switch } from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

const ActionButtons = ({ nextFn, openFn, resetFn, loading, autoDisplay, setAutoDisplay }) => {
  const [open, setOpen] = useState(false);
  function setAutoDisplayIt(e) {
    setAutoDisplay(e.target.checked);
  }
  return (
    <div className='ActionButtons'>
      <Loading visible={loading} />
      <div className='Action-Button-Box'>
        <HomeIcon onClick={() => resetFn()} sx={NoTextTransform}>Reset</HomeIcon>
        <AddIcon onClick={() => openFn()} sx={NoTextTransform}>Open</AddIcon>
        <NavigateNextIcon onClick={() => nextFn()} sx={NoTextTransform}>Next</NavigateNextIcon>
        <DownloadIcon onClick={() => setOpen(true)} sx={NoTextTransform}>Download</DownloadIcon>
        <Switch checked={autoDisplay} onChange={setAutoDisplayIt} size="small" />
      </div>
      <Download setOpen={setOpen} open={open} />
    </div>
  )

}

export default ActionButtons