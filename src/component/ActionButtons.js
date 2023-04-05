import { useState } from 'react';

import './ActionButtons.css';
import Loading from './Loading';
import Download from './Download';

import { NoTextTransform } from '../config/ThromeConfig';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

const ActionButtons = ({ nextFn, openFn, resetFn, loading }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='ActionButtons'>
      <Loading visible={loading} />
      <div className='Action-Button-Box'>
        <HomeIcon onClick={() => resetFn()} sx={NoTextTransform}>Reset</HomeIcon>
        <AddIcon onClick={() => openFn()} sx={NoTextTransform}>Open</AddIcon>
        <NavigateNextIcon onClick={() => nextFn()} sx={NoTextTransform}>Next</NavigateNextIcon>
        <DownloadIcon onClick={() => setOpen(true)} sx={NoTextTransform}>Download</DownloadIcon>
      </div>
      <Download setOpen={setOpen} open={open} />
    </div>
  )

}

export default ActionButtons