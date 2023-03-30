import React, { Component } from 'react'
import ConfigLoad from './ConfigLoad';
import ContentParse from './ContentParse';

import Listing from './Listing';
import Content from './Content';
import ActionButtons from './ActionButtons';
import DataService from './DataService';

import './Container.css';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingData: [],
      contentData: []
    }
    this.nextUrlVisited = new Set()
  }

  componentDidMount() {
    // why this method is invoked twice 
    // see document: https://www.imooc.com/wenda/detail/700135
    if (!this._Mounted) {
      this.loadConfig().then(
        () => this.handleUrl('entry.html')
      )
      this._Mounted = true;
    }
  }

  async loadConfig() {
    let rules = await ConfigLoad.loadRules()
    this.contentParse = new ContentParse(rules);
  }

  handleUrl(url, append) {
    if (!url || !this.contentParse) {
      return;
    }
    this.setState({ loading: true })
    this.contentParse.parse(url, append).then(result => {
      this.setState({ loading: false })
      if(!result) {
        return;
      }
      if(result.unMatched) {
        window.open(url, '_blank');
      }
      this.setState(state => {
        return append ? this.mergeData(state, result) : result;
      })
      if (result?.autoDisplayList) {
        result.listingData.forEach(item => {
          this.handleUrl(item.url, true);
        });
      }
    });
  }

  mergeData(state, result) {
    if (result.listFlag) {
      let { listingData, listingNext } = result
      listingData = [...state.listingData, ...listingData]
      return { listingData, listingNext }
    } else {
      let { contentData } = result
      contentData = [...state.contentData, ...contentData]
      return { contentData }
    }
  }

  nextFn() {
    let { listingNext } = this.state;
    if (this.nextUrlVisited.has(listingNext)) {
      return;
    }
    this.nextUrlVisited.add(listingNext);
    console.log('nextFn invoked')
    this.handleUrl(listingNext, true);
  }

  openFn() {
    let url = prompt('Open URL:')
    if (url) {
      this.handleUrl(url);
    }
  }

  onContentClose(index) {
    this.setState(state => {
      let contentData = state.contentData.filter((_, i) => i !== index)
      return { contentData }
    });
  }

  onContentDelete(index, item) {
    let contentIds = item.contentIds;
    DataService.markReadByDetailId(contentIds[0], contentIds[1])
    this.onContentClose(index);
  }

  onContentLike(index, item) {
    let contentIds = item.contentIds;
    DataService.markScore(contentIds[0], contentIds[1], 10)
    this.onContentClose(index);
  }

  render() {
    let { listingData, contentData, loading } = this.state;
    return (
      <div className="Container">
        <div className="Left-Box">
          <ActionButtons nextFn={() => this.nextFn()} loading={loading} openFn={() => this.openFn()} />
          <Listing listingData={listingData}
            onItemClick={(url) => this.handleUrl(url)} onScrollToBottom={() => this.nextFn()} />
        </div>
        <div className="Right-Box">
          <Content contentData={contentData} onDelete={(index, item) => this.onContentDelete(index, item)}
            onClose={(index) => this.onContentClose(index)}
            onLike={(index, item) => this.onContentLike(index, item)} />
        </div>
      </div>
    )
  }
}

export default Container