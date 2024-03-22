import { useState, useContext } from "react"
import { observer } from 'mobx-react';

import AppContext from '@/app/appContext';

import { Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import Loading from '@/component/Loading';
import Download from '@/component/Download';
import '@/style/ActionButtons.css';

const ActionButtons = observer(() => {

  const appStore = useContext(AppContext);
  let { resetLink, openLink, handleNext, autoDisplay, setAutoDisplay, loading, totalPages } = appStore;

  const [open, setOpen] = useState(false);

  return (
    <div className='ActionButtons'>
      <div className='Action-Button-Box'>
        <HomeIcon onClick={resetLink} >Reset</HomeIcon>
        <AddIcon onClick={openLink}>Open</AddIcon>
        <NavigateNextIcon onClick={handleNext} >Next</NavigateNextIcon>
        <DownloadIcon onClick={() => setOpen(true)} >Download</DownloadIcon>
        <Switch checked={autoDisplay} onChange={(e) => setAutoDisplay(e.target.checked)} size="small" />
        <div className="Listing-Tips">{totalPages}</div>
      </div>
      <Download setOpen={setOpen} open={open} />
      <Loading visible={loading} />
    </div>
  )

})

export default ActionButtons