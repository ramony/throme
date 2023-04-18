const bindClassMethods = (instance) => {
  for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
    if (key !== 'constructor') {
      instance[key] = instance[key].bind(instance);
    }
  }
}

export { bindClassMethods }