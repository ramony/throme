import React, { Component } from 'react'
import './ActionButtons.css';
import Loading from './Loading';
import { Button, ButtonGroup } from '@mui/material';

const ActionButtons = ({ nextFn, openFn, loading }) => {
  return (
    <div>
      <Loading visible={loading} />
      <ButtonGroup variant="contained" color='warning'>
        <Button onClick={() => nextFn()}>Next</Button>
        <Button onClick={() => openFn()}>Open</Button>
        <Button onClick={() => window.location.reload()}>Reset</Button>
      </ButtonGroup>
    </div>
  )

}

export default ActionButtons