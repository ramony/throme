import './Content.css';
import { Button, ButtonGroup } from '@mui/material';
import {NoTextTransform} from './InputStyles';

const Content = ({ contentData, onDelete, onClose, onLike}) => {
  return (
    <div className="Content">
      {
        contentData.map((item, index) => {
          let actions = null;
          if (item.contentIdString) {
            actions = <div>
              <ButtonGroup variant="contained">
                <Button onClick={() => onDelete(index, item)} sx={NoTextTransform}>Delete {item.contentIdString}</Button>
                <Button onClick={() => onClose(index)} sx={NoTextTransform}>Close {item.contentIdString}</Button>
                <Button onClick={() => onLike(index, item)} sx={NoTextTransform}>Like {item.contentIdString}</Button>
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