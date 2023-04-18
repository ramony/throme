const buildClassMethods = (prototype, instance) => {
  for (let key of Object.getOwnPropertyNames(prototype)) {
    if (key !== 'constructor') {
      instance[key] = instance[key].bind(instance);
    }
  }
}

export { buildClassMethods }