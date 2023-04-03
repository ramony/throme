import './Content.css';
import { Button, ButtonGroup } from '@mui/material';
import {NoTextTransform} from '../config/ThromeConfig';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GradeIcon from '@mui/icons-material/Grade';

const Content = ({ contentData, onDelete, onClose, onLike}) => {
  return (
    <div className="Content">
      <div class="Content-Tips">{contentData.length}</div>
      {
        contentData.map((item, index) => {
          let actions = null;
          if (item.contentIdString) {
            actions = <div>
              <div className="Content-Button-Box">
                <div>{item.contentIdString}</div>
                <DeleteForeverIcon onClick={() => onDelete(index, item)} sx={NoTextTransform}>Delete {item.contentIdString}</DeleteForeverIcon>
                <ClearIcon onClick={() => onClose(index)} sx={NoTextTransform}>Close {item.contentIdString}</ClearIcon>
                { item.downloaded ? <GradeIcon onClick={() => onLike(index, item)} sx={NoTextTransform}>Like {item.contentIdString}</GradeIcon> : <></>}
              </div>
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