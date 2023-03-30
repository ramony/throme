import { useRef } from 'react';

import './ActionButtons.css';
import Loading from './Loading';
import Download from './Download';
import { Button, ButtonGroup } from '@mui/material';
import {ButtonNormal} from './InputStyles';

const ActionButtons = ({ nextFn, openFn, loading }) => {
  const downloadRef = useRef(null);
  function handleDownload() {
    downloadRef.current.open();
  }
  return (
    <div className='ActionButtons'>
      <Loading visible={loading} />
      <ButtonGroup variant="contained" color='warning'>
        <Button sx={ButtonNormal} onClick={() => nextFn()}>Next</Button>
        <Button sx={ButtonNormal} onClick={() => openFn()}>Open</Button>
        <Button sx={ButtonNormal} onClick={() => window.location.reload()}>Reset</Button>
        <Button sx={ButtonNormal} onClick={handleDownload}>Download</Button>
      </ButtonGroup>
      <Download ref={downloadRef} />
    </div>
  )

}

export default ActionButtons