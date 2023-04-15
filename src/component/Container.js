import { useEffect } from 'react'

import Content from './Content';
import ActionButtons from './ActionButtons';
import Listing from './Listing';

import './Container.css';

import { store } from '../app/store';

function Container() {
  useEffect(() => {
    store.loadConfig().then(() => {
      store.handleEntry()
    })
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