/* eslint-disable no-use-before-define */
const getValue = (value) => ((value instanceof Object) ? '[complex value]' : value);

const getKey = (composKey, currentKey) => (
  composKey === '' ? `${currentKey}` : `${composKey}.${currentKey}`
);

const collectionOfStrings = {
  unchanged: () => null,
  changed: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`,
  added: (key, { value }) => `Property '${key}' was added with value: ${getValue(value)}`,
  deleted: (key) => `Property '${key}' was removed`,
  nested: (key, { children }) => plain(children, key),
};

const stringify = (data, ancestry = '') => {
  const currentKey = ancestry;
  const { type, key } = data;
  const compositeKey = getKey(currentKey, key);
  return collectionOfStrings[type](compositeKey, data);
};

const plain = (data, ancestry) => data.map((el) => stringify(el, ancestry)).filter((el) => el).join('\n');
export default plain;
