import { handleData, handleLoading } from './thromeSlice';

const handleUrlAction = (url, append, contentParse) => (dispatch) => {
  if (!url || !contentParse) {
    return;
  }
  dispatch(handleLoading(true));
  contentParse.parse(url, append).then(result => {
    console.log(result)
    if (!result) {
      return;
    }
    if (result.unMatched) {
      console.log('No rule for url', url);
      return;
    }

    dispatch(handleData({ result, append }))

    if (result.listFlag) {
      if (result?.autoDisplayList) {
        console.log('auto display count:', result.listingData.length);
        result.listingData.forEach(item => {
          setTimeout(() => handleUrlAction(item.url, true, contentParse), 1)
        });
      }
    } else {
      if (!append) {
        //if new content, reset scrollTop value.
        document.getElementsByClassName("Content")[0].scrollTop = 0;
      }
    }
  }).catch(e => console.error(e))
    .finally(() =>
      dispatch(handleLoading(false))
    );
}

function handleNextFn() {
  let { listingNext } = this.state;
  if (this.nextUrlVisited.has(listingNext)) {
    return;
  }
  this.nextUrlVisited.add(listingNext);
  console.log('nextFn invoked')
  this.handleUrl(listingNext, true);
}

onOpenFn() {
  let url = prompt('Open URL:')
  if (url) {
    this.handleUrl(url);
  }
}

onResetFn() {
  //To reset base url so that we can reload local entry.json data.
  document.getElementsByTagName("base")[0].setAttribute('href', '')
  this.handleUrl(ConfigLoad.loadEntryPath());
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

onSetAutoDisplay(value) {
  this.setState({ autoDisplay: value })
}

export { handleUrlAction }
