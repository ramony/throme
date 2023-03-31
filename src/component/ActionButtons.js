import { useRef } from 'react';

import './ActionButtons.css';
import Loading from './Loading';
import Download from './Download';
import {NoTextTransform} from '../config/ThromeConfig';

import { Button, ButtonGroup } from '@mui/material';

const ActionButtons = ({ nextFn, openFn, loading }) => {
  const downloadRef = useRef(null);
  function handleDownload() {
    downloadRef.current.open();
  }
  return (
    <div className='ActionButtons'>
      <Loading visible={loading} />
        <ButtonGroup variant="contained" >
          <Button onClick={() => nextFn()} sx={NoTextTransform}>Next</Button>
          <Button onClick={() => openFn()} sx={NoTextTransform}>Open</Button>
          <Button onClick={() => window.location.reload()} sx={NoTextTransform}>Reset</Button>
          <Button onClick={handleDownload} sx={NoTextTransform}>Download</Button>
        </ButtonGroup>
      <Download ref={downloadRef} />
    </div>
  )

}

export default ActionButtons