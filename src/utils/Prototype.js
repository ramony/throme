const map = (o, fn) => Object.fromEntries(Object.entries(o).map(
  ([k, v], i) => [k, fn(v, k)]
));

const extend = (t, s) => Object.entries(s).map(
  ([k, v], i) => t[k] = v
);

const getType = (o) => Object.prototype.toString.call(o).match(/^\[object\s(.*)\]$/)[1];

export { map, extend, getType }