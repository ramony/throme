const NextFunMap = {
  findFirst(nodelist) {
    let elements = [...nodelist]
    return elements.at(0)?.['href'];;
  },
  findLast(nodelist) {
    let elements = [...nodelist]
    return elements.at(-1)?.['href'];;
  },
  findNext(nodelist) {
    let elements = [...nodelist]
    if (elements.length > 0) {
      return elements.next()[0]['href'];
    }
    return null;
  },
  findLast2(nodelist) {
    let elements = [...nodelist]
    return elements.at(-2)?.['href'];;
  },
  findOnUrl(url, param) {
    //pageIndex=5 => pageIndex=6
    let nextUrl = url.replace(new RegExp(`(${param})([0-9]+)`), (_, a, b) => a + (parseInt(b) + 1));
    if (nextUrl !== url) {
      return nextUrl;
    }
    return null;
  }
}

export default NextFunMap