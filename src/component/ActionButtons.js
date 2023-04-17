import { observer } from 'mobx-react';

import { Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import Loading from '@/component/Loading';

import '@/component/ActionButtons.css';

import AppContext from '@/app/appContext';

import { useState, useContext } from "react"

import { NoTextTransform } from '@/config/ThromeConfig';

import Download from '@/component/Download';


const ActionButtons = observer(() => {

  const store = useContext(AppContext);
  const [open, setOpen] = useState(false);

  let { resetLink, openLink, handleNext, setAutoDisplay } = store

  return (
    <div className='ActionButtons'>
      <div className='Action-Button-Box'>
        <HomeIcon onClick={resetLink} sx={NoTextTransform}>Reset</HomeIcon>
        <AddIcon onClick={openLink} sx={NoTextTransform}>Open</AddIcon>
        <NavigateNextIcon onClick={handleNext} sx={NoTextTransform}>Next</NavigateNextIcon>
        <DownloadIcon onClick={() => setOpen(true)} sx={NoTextTransform}>Download</DownloadIcon>
        <Switch checked={store.autoDisplay} onChange={(e) => setAutoDisplay(e.target.checked)} size="small" />
      </div>
      <Download setOpen={setOpen} open={open} />
      <Loading visible={store.loading} />
    </div>
  )

})

export default ActionButtons