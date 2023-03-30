import { useRef } from 'react';

import './ActionButtons.css';
import Loading from './Loading';
import Download from './Download';
import { Button, ButtonGroup } from '@mui/material';
import { NoTextTransform, SmallText, GrayButtonTheme } from './InputStyles';
import {ThemeProvider } from '@mui/material/styles';

const ActionButtons = ({ nextFn, openFn, loading }) => {
  const downloadRef = useRef(null);
  function handleDownload() {
    downloadRef.current.open();
  }
  return (
    <div className='ActionButtons'>
      <Loading visible={loading} />
      <ThemeProvider theme={GrayButtonTheme}>
        <ButtonGroup variant="contained">
          <Button sx={NoTextTransform} onClick={() => nextFn()}>Next</Button>
          <Button sx={NoTextTransform} onClick={() => openFn()}>Open</Button>
          <Button sx={NoTextTransform} onClick={() => window.location.reload()}>Reset</Button>
          <Button sx={NoTextTransform} onClick={handleDownload}>Download</Button>
        </ButtonGroup>
      </ThemeProvider>
      <Download ref={downloadRef} />
    </div>
  )

}

export default ActionButtons