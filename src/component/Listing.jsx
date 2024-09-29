import { useState, useContext } from "react"
import { observer } from 'mobx-react';

import AppContext from '@/app/appContext';

import '@/style/Listing.css';

const Listing = observer(() => {

  const appStore = useContext(AppContext);
  const [hover, setHover] = useState({});

  function mouseOver(index) {
    setHover({ [index]: '1' })
  }

  function mouseOut(index) {
    setHover({ [index]: '' })
  }

  function itemClick(index) {
    appStore.handleItemSelected(index);
  }

  function scroll(e) {
    let element = e.target;
    let top = element.scrollTop;
    let height = element.clientHeight;
    let scrollHeight = element.scrollHeight;
    if (top + height >= scrollHeight - 400) {
      //this.props.onScrollToBottom()
      appStore.handleNext()
    }
  }

  function calcClassName(index, item) {
    let classes = ['Listing-Round-Angle Listing-Item']
    if (index % 2 === 0) {
      classes.push('Listing-Item-Even');
    }
    if (hover[index]) {
      classes.push('Listing-Item-Hover')
    }
    let { listingSelected } = appStore;
    if (listingSelected.url + listingSelected.index === item.url + index) {
      classes.push('Listing-Item-Click')
    }
    return classes.join(' ')
  }

  function openUrl(e, url) {
    e.preventDefault()
    console.log(url)
    window.open(url, '_blank');
  }

  return (
    <div className="Listing" onScroll={(e) => scroll(e)}>
      {
        appStore.listingData.map((item, index) => {
          let className = calcClassName(index, item)
          return <div className={className} key={item.key}
            onMouseOver={() => mouseOver(index)} onMouseOut={() => mouseOut(index)}
            onClick={() => itemClick(index)} onContextMenu={(e) => openUrl(e, item.url)}>{item.title}</div>
        })
      }
    </div>
  )

})

export default Listing