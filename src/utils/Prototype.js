const map = (o, fn) => Object.fromEntries(Object.entries(o).map(
    ([k, v], i) => [k, fn(v, k)]
))

export { map }