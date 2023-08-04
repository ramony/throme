import { useContext } from "react"
import { observer } from 'mobx-react';

import AppContext from '@/app/appContext';

import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GradeIcon from '@mui/icons-material/Grade';

import '@/style/Detail.css';

const Detail = observer(() => {
  const appStore = useContext(AppContext);
  const { contentData, closeContent, closeAllContent, removeContent, likeContent } = appStore;

  return (
    <div className="Content">
      <div className="Content-Tips" onDoubleClick={closeAllContent}>{contentData.length}</div>
      {
        contentData.map((item, index) => {
          let actions = null;
          if (item.contentIdString) {
            actions =
              <div className="Content-Button-Box">
                <ClearIcon onClick={() => closeContent(index)} >Close {item.contentIdString}</ClearIcon>
                <DeleteForeverIcon onClick={() => removeContent(index, item)} >Delete {item.contentIdString}</DeleteForeverIcon>
                {item.downloaded ? <GradeIcon onClick={() => likeContent(index, item)}>Like {item.contentIdString}</GradeIcon> : <></>}
                <span onClick={() => window.open(item.contentUrl)}>{item.contentIdString}</span>
              </div>
          }
          return (
            <div className="Content-Item" key={item.key}>
              {actions}
              <div className="Content-Title">{item.title}</div>
              <div className="Content-Detail" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              <div className="Content-Title">{item.title}</div>
              {actions}
            </div>)
        })
      }
    </div>
  )

})

export default Detail