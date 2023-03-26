import React, { Component } from 'react'
import './Loading.css';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    
  }

  render() {
    let {visible} = this.props;
    if(!visible) {
      return <></>
    }
    return (
        <figure>
            <div className="dot white"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </figure>
    )
  }
}

export default Loading