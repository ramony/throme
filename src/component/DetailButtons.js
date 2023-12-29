import { useContext } from "react"
import { observer } from 'mobx-react';

import AppContext from '@/app/appContext';

import '@/style/Detail.css';

const DetailButtons = observer(() => {
  const appStore = useContext(AppContext);
  const { contentData, closeAllContent } = appStore;

  return (
    <div className="Content-Action">
      <div className="Content-Tips" onDoubleClick={closeAllContent}>{contentData.length}</div>
    </div>
  )

})

export default DetailButtons