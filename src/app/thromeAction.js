import {
  handleLoading, handleUrl as handleUrlPrimary,
  closeContent as closeContentPrimary, setAutoDisplay as setAutoDisplayPrimary
} from './thromeSlice';
import ConfigLoad from '../service/ConfigLoad';
import DataService from '../service/DataService';
import ContentParse from '../service/ContentParse';
import { useRef } from 'react'

function useThromeLoad(dispatch, state) {
  console.log('useThromeLoad')

  const data = useRef({ nextUrlVisitSet: new Set() });
  async function loadConfig() {
    console.log('loadConfig invoked');
    let rules = await ConfigLoad.loadRules()
    data.current.contentParse = new ContentParse(rules);
  }

  function handleEntry(url, append) {
    handleUrl(ConfigLoad.loadEntryPath());
  }

  function handleUrl(url, append) {
    console.log('handleUrl invoked');
    let { contentParse } = data.current
    if (!url || !contentParse) {
      return;
    }
    dispatch(handleLoading(true));
    contentParse.parse(url, append).then(result => {
      if (!result) {
        return;
      }
      if (result.unMatched) {
        console.log('No rule for url', url);
        return;
      }
      dispatch(handleUrlPrimary({ result, append }))
      if (result.listFlag) {
        if (state.autoDisplay && result?.autoDisplayList) {
          console.log('auto display count:', result.listingData.length);
          result.listingData.forEach(item => {
            setTimeout(() => handleUrl(item.url, true), 1)
          });
        }
      } else {
        if (!append) {
          //if new content, reset scrollTop value.
          document.getElementsByClassName("Content")[0].scrollTop = 0;
        }
      }
    }).catch(e => console.error(e))
      .finally(() => dispatch(handleLoading(false)));
  }

  function handleNext() {
    let { nextUrlVisitSet } = data.current
    let { listingNext } = state;
    if (nextUrlVisitSet.has(listingNext)) {
      return;
    }
    nextUrlVisitSet.add(listingNext);
    console.log('handleNext invoked, url:', listingNext);

    handleUrl(listingNext, true);
  }

  function openLink() {
    console.log('openLink invoked')
    let url = prompt('Open URL:')
    if (url) {
      handleUrl(url);
    }
  }

  function resetLink() {
    console.log('resetLink invoked');
    //To reset base url so that we can reload local entry.json data.
    document.getElementsByTagName("base")[0].setAttribute('href', '')
    handleUrl(ConfigLoad.loadEntryPath());
  }

  function setAutoDisplay(value) {
    dispatch(setAutoDisplayPrimary(value));
  }

  return {
    loadConfig, handleEntry, handleUrl, handleNext, openLink, resetLink, setAutoDisplay
  }

}

function useThromeContent(dispatch) {
  console.log('useThromeContent')

  function closeContent(index) {
    dispatch(closeContentPrimary(index))
  }

  function removeContent(index, item) {
    let contentIds = item.contentIds;
    DataService.markReadByDetailId(contentIds[0], contentIds[1])
    closeContent(index);
  }

  function likeContent(index, item) {
    let contentIds = item.contentIds;
    DataService.markScore(contentIds[0], contentIds[1], 10)
    closeContent(index);
  }

  return {
    closeContent, removeContent, likeContent
  }

}

export { useThromeLoad, useThromeContent }