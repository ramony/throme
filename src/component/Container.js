import { useEffect, useContext } from 'react'

import Content from './Content';
import ActionButtons from './ActionButtons';
import Listing from './Listing';

import '@/component/Container.css';

import AppContext from '@/app/appContext';

function Container() {

  const store = useContext(AppContext);

  useEffect(() => {
    store.loadConfig().then(() => {
      store.handleEntry()
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