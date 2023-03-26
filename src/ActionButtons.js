import React, { Component } from 'react'
import './ActionButtons.css';
import Loading from './Loading';

class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    let { nextFn, openFn, loading } = this.props;
    return (
      <div>
        <Loading visible={loading} />
        <input type="button" className="button input-right" onClick={() => nextFn()} value="Next" />
        <input type="button" className="button input-right" onClick={() => openFn()} value="Open" />
        <input type="button" className="button input-right" onClick={() => window.location.reload()} value="Reset" />
      </div>
    )
  }
}

export default ActionButtons