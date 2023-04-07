import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Listing from './Listing';

import { handleUrlAction } from '../app/thromeAction';
import Content from './Content';
import ActionButtons from './ActionButtons';

import DataService from '../service/DataService';
import ConfigLoad from '../service/ConfigLoad';
import ContentParse from '../service/ContentParse';

import './Container.css';

function Container(props) {
  const nextUrlVisited = useRef(new Set());
  const contentParse = useRef(null);
  const throme = useSelector(state => state.throme)
  const dispatch = useDispatch()

  useEffect(() => {
    ConfigLoad.loadRules().then(rules => {
      contentParse.current = new ContentParse(rules);
      dispatch(handleUrlAction(ConfigLoad.loadEntryPath(), false, contentParse.current))
    })
  }, []);

  return (
    <div className="Container">
      <div className="Left-Box">
        <ActionButtons />

        {
          (throme.listingData || []).map((item, index) => {
            //let className = this.calcClassName(index, item)
            return <div>{item.title}</div>
          })
        }
      </div>
      <div className="Right-Box">

      </div>
    </div>
  )

}

export default Container