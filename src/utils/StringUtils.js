const randRepeat = (text, min, max) => {
  let count = Math.floor(Math.random() * (max - min)) + min;
  let result = []
  while (count-- > 0) {
    result.push(text);
  }
  return result;
}
export { randRepeat }