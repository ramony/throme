import './Content.css';
import { NoTextTransform } from '../config/ThromeConfig';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GradeIcon from '@mui/icons-material/Grade';
import { useSelector, useDispatch } from 'react-redux'
import { useThromeContent } from '../app/thromeAction';

const Content = (props) => {
  const dispatch = useDispatch();
  const contentData = useSelector(state => state.throme.contentData)
  const contentAction = useThromeContent(dispatch);

  return (
    <div className="Content">
      <div class="Content-Tips">{contentData.length}</div>
      {
        contentData.map((item, index) => {
          let actions = null;
          if (item.contentIdString) {
            actions =
              <div className="Content-Button-Box">
                <ClearIcon onClick={() => contentAction.closeContent(index)} sx={NoTextTransform}>Close {item.contentIdString}</ClearIcon>
                <DeleteForeverIcon onClick={() => contentAction.removeContent(index, item)} sx={NoTextTransform}>Delete {item.contentIdString}</DeleteForeverIcon>
                {item.downloaded ? <GradeIcon onClick={() => contentAction.likeContent(index, item)} sx={NoTextTransform}>Like {item.contentIdString}</GradeIcon> : <></>}
                <span onClick={() => window.open(item.contentUrl)}>{item.contentIdString}</span>
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