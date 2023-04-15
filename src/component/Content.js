import './Content.css';
import { NoTextTransform } from '../config/ThromeConfig';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GradeIcon from '@mui/icons-material/Grade';
import { observer } from 'mobx-react';
import { store, storeFns } from '../app/store';

const Content = observer(() => {
  const { closeContent, removeContent, likeContent } = storeFns;
  const { contentData } = store;
  return (
    <div className="Content">
      <div className="Content-Tips">{contentData.length}</div>
      {
        contentData.map((item, index) => {
          let actions = null;
          if (item.contentIdString) {
            actions =
              <div className="Content-Button-Box">
                <ClearIcon onClick={() => closeContent(index)} sx={NoTextTransform}>Close {item.contentIdString}</ClearIcon>
                <DeleteForeverIcon onClick={() => removeContent(index, item)} sx={NoTextTransform}>Delete {item.contentIdString}</DeleteForeverIcon>
                {item.downloaded ? <GradeIcon onClick={() => likeContent(index, item)} sx={NoTextTransform}>Like {item.contentIdString}</GradeIcon> : <></>}
                <span onClick={() => window.open(item.contentUrl)}>{item.contentIdString}</span>
              </div>
          }
          return (
            <div className="Content-Item" key={index}>
              {actions}
              <div className="Content-Title">{item.title}</div>
              <div className="Content-Detail" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              {actions}
            </div>)
        })
      }
    </div>
  )

})

export default Content