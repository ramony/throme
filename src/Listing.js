import React, { Component } from 'react'
import './Listing.css';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  itemClick(item, index) {
    this.props.onItemClick(item.url)
    this.setState({ clickKey: item.url })
  }

  scroll(e) {
    let element = e.target;
    let top = element.scrollTop;
    let height = element.clientHeight;
    let scrollHeight = element.scrollHeight;
    if (top + height >= scrollHeight - 400) {
      this.props.onScrollToBottom()
    }
  }

  calcClassName(index, url) {
    let classes = ['Listing-Round-Angle Listing-Item']
    if (index % 2 === 0) {
      classes.push('Listing-Item-Even');
    }
    if (this.state.clickKey === url) {
      classes.push('Listing-Item-Click')
    }
    return classes.join(' ')
  }

  openUrl(e, url) {
    e.preventDefault()
    console.log(url)
    window.open(url, '_blank');
  }

  render() {
    return (
      <div className="Listing" onScroll={(e) => this.scroll(e)}>
        {
          this.props.listingData.map((item, index) => {
            let className = this.calcClassName(index, item.url)
            return <div className={className} key={index}
              onClick={() => this.itemClick(item, index)} onContextMenu={(e) => this.openUrl(e, item.url)}>{item.title}</div>
          })
        }
      </div>
    )
  }

}

export default Listing