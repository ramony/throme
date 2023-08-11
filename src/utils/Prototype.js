const map = (o, fn) => Object.fromEntries(Object.entries(o).map(
    ([k, v], i) => [k, fn(v, k)]
));

const extend = (t, s) => Object.entries(s).map(
    ([k, v], i) => t[k] = v
);

export { map, extend }