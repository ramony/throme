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
  }
}
export default Unsafe;