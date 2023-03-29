import React, { Component } from 'react'
import './Content.css';
import { Button, ButtonGroup } from '@mui/material';

const ButtonColor = { bgcolor: "gray" };
const Content = ({ contentData, onDelete, onClose, onLike}) => {
  return (
    <div className="Content">
      {
        contentData.map((item, index) => {
          let actions = null;
          if (item.contentIdString) {
            actions = <div>
              <ButtonGroup variant="contained" color='warning'>
                <Button onClick={() => onDelete(index, item)} sx={ButtonColor}>Delete {item.contentIdString}</Button>
                <Button onClick={() => onClose(index)} sx={ButtonColor}>Close {item.contentIdString}</Button>
                <Button onClick={() => onLike(index, item)} sx={ButtonColor}>Like {item.contentIdString}</Button>
              </ButtonGroup>
            </div>
          }
          return (
            <div className="Content-Item">
              {actions}
              <div className="Content-Title">{item.title}</div>
              <div className="Content-Detail" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              {actions}
            </div>)
        })
      }
    </div>
  )

}

export default Content