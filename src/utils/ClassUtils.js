const buildClassMethods = (prototype, instance) => {
  var object = {}
  for (let key of Object.getOwnPropertyNames(prototype)) {
    if (key !== 'constructor') {
      object[key] = instance[key].bind(instance);
    }
  }
  return object;
}

export { buildClassMethods }