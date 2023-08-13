const fnParser = (exp) => {
  if (!exp) {
    return []
  }
  let [fnName, ...arg] = exp.replace(/@/, '').split(/[~]+/);
  let fnDef = window.funMap?.[fnName];
  return [fnDef, arg];
}

export { fnParser }