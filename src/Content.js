import './Content.css';
import { Button, ButtonGroup } from '@mui/material';
import {ButtonGray} from './InputStyles';

const Content = ({ contentData, onDelete, onClose, onLike}) => {
  return (
    <div className="Content">
      {
        contentData.map((item, index) => {
          let actions = null;
          if (item.contentIdString) {
            actions = <div>
              <ButtonGroup variant="contained" color='warning'>
                <Button onClick={() => onDelete(index, item)} sx={ButtonGray}>Delete {item.contentIdString}</Button>
                <Button onClick={() => onClose(index)} sx={ButtonGray}>Close {item.contentIdString}</Button>
                <Button onClick={() => onLike(index, item)} sx={ButtonGray}>Like {item.contentIdString}</Button>
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