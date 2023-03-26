import React, { Component } from 'react'
import './Listing.css';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    //必须在这里声明，所以 ref 回调可以引用它
    //this.props.onRef(this)
  }

  mouseOver(index) {
    this.setState({ [this.hoveKey(index)]: '1' })
  }

  mouseOut(index) {
    this.setState({ [this.hoveKey(index)]: '' })
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
    if (this.state[this.hoveKey(index)]) {
      classes.push('Listing-Item-Hover')
    }
    if (this.state.clickKey === url) {
      classes.push('Listing-Item-Click')
    }
    return classes.join(' ')
  }

  hoveKey(index) {
    return 'hoveKey-' + index;
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
              onMouseOver={() => this.mouseOver(index)} onMouseOut={() => this.mouseOut(index)}
              onClick={() => this.itemClick(item, index)} onContextMenu={(e) => this.openUrl(e, item.url)}>{item.title}</div>
          })
        }
      </div>
    )
  }

}

export default Listing