const NextFunMap = {
  findFirst: function (nodelist) {
    let elements = [...nodelist]
    if (elements.length > 0) {
      return elements[0]['href'];
    }
    return null;
  },
  findLast: function (nodelist) {
    let elements = [...nodelist]
    if (elements.length > 0) {
      return elements[elements.length - 1]['href'];
    }
    return null;
  },
  findNext: function (nodelist) {
    let elements = [...nodelist]
    if (elements.length > 0) {
      return elements.next()[0]['href'];
    }
    return null;
  },
  findLast2: function (nodelist) {
    let elements = [...nodelist]
    if (elements.length > 0) {
      return elements[elements.length - 2]['href'];
    }
    return null;
  }
}


export default NextFunMap