import React, { Component } from 'react'
import './Content.css';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Content">
        {
          this.props.contentData.map((item, index) => {
            return (
              <div className="Content-Item">
                  <div class="Content-Title">{item.title}</div>
                  <div className="Content-Detail" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </div>)
          })
        }
      </div>
    )
  }

}

export default Content