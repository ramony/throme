const Unsafe = {
  getKeyword(title) {
    try {
      return window.GetVideoKeyword(title)
    } catch (e) {
      return null;
    }
  },
  validateTitleIfExist(title) {
    try {
      return window.ValidateTitleIfExist(title)
    } catch (e) {
      return null;
    }
  },
  fixExpiredUrl(url) {
    try {
      let newUrl = window.fixExpiredUrl(url)
      console.log('newUrl', newUrl)
      return newUrl;
    } catch (e) {
      return url;
    }
  }
}
export default Unsafe;