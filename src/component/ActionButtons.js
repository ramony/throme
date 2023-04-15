import { observer } from 'mobx-react';

import { Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

import '@/component/ActionButtons.css';

import { store, storeFns } from '@/app/store';
import { useLocal } from '@/app/appUse';

import { NoTextTransform } from '@/config/ThromeConfig';

import Loading from '@/component/Loading';
import Download from '@/component/Download';


const ActionButtons = observer(() => {
  const [open, setOpen] = useLocal(false);
  let { resetLink, openLink, handleNext, setAutoDisplay } = storeFns
  return (
    <div className='ActionButtons'>
      <Loading visible={store.loading} />
      <div className='Action-Button-Box'>
        <HomeIcon onClick={resetLink} sx={NoTextTransform}>Reset</HomeIcon>
        <AddIcon onClick={openLink} sx={NoTextTransform}>Open</AddIcon>
        <NavigateNextIcon onClick={handleNext} sx={NoTextTransform}>Next</NavigateNextIcon>
        <DownloadIcon onClick={() => setOpen(true)} sx={NoTextTransform}>Download</DownloadIcon>
        <Switch checked={store.autoDisplay} onChange={(e) => setAutoDisplay(e.target.checked)} size="small" />
      </div>
      <Download setOpen={setOpen} open={open} />
    </div>
  )

})

export default ActionButtons