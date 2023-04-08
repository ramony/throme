import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useThromeLoad } from '../app/thromeAction';
import Content from './Content';
import ActionButtons from './ActionButtons';
import Listing from './Listing';

import './Container.css';

function Container(props) {
  const dispatch = useDispatch();
  const loadAction = useThromeLoad(dispatch);

  useEffect(() => {
    loadAction.loadConfig().then(rules => {
      loadAction.handleEntry()
    })
  }, []);

  return (
    <div className="Container">
      <div className="Left-Box">
        <ActionButtons loadAction={loadAction} />
        <Listing loadAction={loadAction} />
      </div>
      <div className="Right-Box">
        <Content />
      </div>
    </div>
  )

}

export default Container