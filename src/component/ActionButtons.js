import { useState } from 'react';
import { observer } from 'mobx-react';

import { Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

import '@/component/ActionButtons.css';

import { store, storeFns } from '@/app/store';
import { NoTextTransform } from '@/config/ThromeConfig';

import Loading from '@/component/Loading';
import Download from '@/component/Download';


const ActionButtons = observer(() => {
  const [open, setOpen] = useState(false);
  const localStore = store;
  let { resetLink, openLink, handleNext, setAutoDisplay } = storeFns
  return (
    <div className='ActionButtons'>
      <Loading visible={localStore.loading} />
      <div className='Action-Button-Box'>
        <HomeIcon onClick={resetLink} sx={NoTextTransform}>Reset</HomeIcon>
        <AddIcon onClick={openLink} sx={NoTextTransform}>Open</AddIcon>
        <NavigateNextIcon onClick={handleNext} sx={NoTextTransform}>Next</NavigateNextIcon>
        <DownloadIcon onClick={() => setOpen(true)} sx={NoTextTransform}>Download</DownloadIcon>
        <Switch checked={localStore.autoDisplay} onChange={(e) => setAutoDisplay(e.target.checked)} size="small" />
      </div>
      <Download setOpen={setOpen} open={open} />
    </div>
  )

})

export default ActionButtons