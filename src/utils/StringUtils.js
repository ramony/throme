const randRepeat = (text, min, max) => {
  let count = Math.floor(Math.random() * (max - min)) + min;
  let result = []
  while (count-- > 0) {
    result.push(text);
  }
  return result;
}

const hashCode = (value) => {
  var h = 0;
  var len = value.length;
  for (var i of value) {
    h = 31 * h + (value.charCodeAt(len - 1 - i) & 0xff);
    h = h & 0xffffffff
    //console.log('xxx', value, h)
  }
  var r = h & 0x7fffffff;
  //console.log('hashcode', value, r)
  return r;
}


const toBigInt = (value) => {
  let result = value.replace(/[^0-9]+/g, '')
  if (result.length > 19) {
    result = result.substr(0, 19)
  }
  return result;
}

export { randRepeat, hashCode, toBigInt }