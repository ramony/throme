import { useRef } from 'react';

import './ActionButtons.css';
import Loading from './Loading';
import Download from './Download';

import {NoTextTransform} from '../config/ThromeConfig';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

const ActionButtons = ({ nextFn, openFn, resetFn, loading }) => {
  const downloadRef = useRef(null);
  function handleDownload() {
    downloadRef.current.open();
  }
  return (
    <div className='ActionButtons'>
      <Loading visible={loading} />
      <div className='Action-Button-Box'>
        <HomeIcon onClick={() => resetFn()} sx={NoTextTransform}>Reset</HomeIcon>
        <AddIcon onClick={() => openFn()} sx={NoTextTransform}>Open</AddIcon>
        <NavigateNextIcon onClick={() => nextFn()} sx={NoTextTransform}>Next</NavigateNextIcon>
        <DownloadIcon onClick={handleDownload} sx={NoTextTransform}>Download</DownloadIcon>
      </div>
      <Download ref={downloadRef} />
    </div>
  )

}

export default ActionButtons