import { useEffect, useContext } from 'react'

import AppContext from '@/app/appContext';

import Detail from '@/component/Detail';
import DetailButtons from '@/component/DetailButtons';

import ActionButtons from '@/component/ActionButtons';
import Listing from '@/component/Listing';
import '@/style/Container.css';

function Container(props) {

  const appStore = useContext(AppContext);

  useEffect(() => {
    appStore.loadConfig().then(() => {
      appStore.handleEntry()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Container">
      <div className="Left-Box">
        <ActionButtons />
        <Listing />
      </div>
      <div className="Right-Box">
        <DetailButtons />
        <Detail />
      </div>
    </div>
  )

}

export default Container