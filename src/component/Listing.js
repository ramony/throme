import { observer } from 'mobx-react';

import { store } from '@/app/store';
import { useLocal } from '@/app/appUse';

import '@/component/Listing.css';

const Listing = observer(() => {

  const { listingData } = store;
  const [hover, setHover] = useLocal({});
  const [clickedItem, setClickItem] = useLocal("");
  function mouseOver(index) {
    setHover({ [index]: '1' })
  }

  function mouseOut(index) {
    setHover({ [index]: '' })
  }

  function itemClick(item, index) {
    store.handleUrl(item.url)
    setClickItem(item.url + index)
  }

  function scroll(e) {
    let element = e.target;
    let top = element.scrollTop;
    let height = element.clientHeight;
    let scrollHeight = element.scrollHeight;
    if (top + height >= scrollHeight - 400) {
      //this.props.onScrollToBottom()
      store.handleNext()
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
    if (clickedItem === item.url + index) {
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
        listingData.map((item, index) => {
          let className = calcClassName(index, item)
          return <div className={className} key={index}
            onMouseOver={() => mouseOver(index)} onMouseOut={() => mouseOut(index)}
            onClick={() => itemClick(item, index)} onContextMenu={(e) => openUrl(e, item.url)}>{item.title}</div>
        })
      }
    </div>
  )

})

export default Listing