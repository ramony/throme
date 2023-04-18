import { useEffect, useContext } from 'react'

import AppContext from '@/app/appContext';

import Content from '@/component/Content';
import ActionButtons from '@/component/ActionButtons';
import Listing from '@/component/Listing';
import '@/component/Container.css';

function Container() {

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
        <Content />
      </div>
    </div>
  )

}

export default Container