import React, { Component } from 'react'
import './Content.css';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  mouseOver(index) {
    this.setState({[this.hoveKey(index)]: '1'})
  }

  mouseOut(index) {
    this.setState({[this.hoveKey(index)]: ''})
  }

  itemClick(item, index) {
    this.props.onItemClick(item.url)
    this.setState({clickKey:index})
  }

  render() {
    return (
      <div className="Content">
        {
          this.props.contentData.map((item, index)=> {            
            return <div className="Content-Item" dangerouslySetInnerHTML={{ __html: item.content}}></div>
          })
        }
      </div>
    )
  }

}

export default Content