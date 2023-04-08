import { useState } from 'react';

import './ActionButtons.css';
import Loading from './Loading';
import Download from './Download';

import { useSelector } from 'react-redux'

import { NoTextTransform } from '../config/ThromeConfig';
import { Switch } from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

const ActionButtons = ({ loadAction }) => {
  const [open, setOpen] = useState(false);
  const thromeState = useSelector(state => state.throme);
  const { resetLink, openLink, handleNext, setAutoDisplay } = loadAction
  return (
    <div className='ActionButtons'>
      <Loading visible={thromeState.loading} />
      <div className='Action-Button-Box'>
        <HomeIcon onClick={resetLink} sx={NoTextTransform}>Reset</HomeIcon>
        <AddIcon onClick={openLink} sx={NoTextTransform}>Open</AddIcon>
        <NavigateNextIcon onClick={handleNext} sx={NoTextTransform}>Next</NavigateNextIcon>
        <DownloadIcon onClick={() => setOpen(true)} sx={NoTextTransform}>Download</DownloadIcon>
        <Switch checked={thromeState.autoDisplay} onChange={(e) => setAutoDisplay(e.target.checked)} size="small" />
      </div>
      <Download setOpen={setOpen} open={open} />
    </div>
  )

}

export default ActionButtons