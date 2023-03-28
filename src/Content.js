import React, { Component } from 'react'
import './Content.css';
import { Button, ButtonGroup } from '@mui/material';

const Content = ({ contentData, onDelete, onClose, onLike}) => {
  return (
    <div className="Content">
      {
        contentData.map((item, index) => {
          let actions = null;
          if (item.contentId) {
            actions = <div>
              <ButtonGroup variant="outlined" color='warning'>
                <Button onClick={() => onDelete(index)}>Delete {item.contentId}</Button>
                <Button onClick={() => onClose(index)}>Close {item.contentId}</Button>
                <Button onClick={() => onLike(index)}>Like {item.contentId}</Button>
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