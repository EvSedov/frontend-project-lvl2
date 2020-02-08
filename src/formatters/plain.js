/* eslint-disable no-use-before-define */
const stringify = (value) => ((value instanceof Object) ? '[complex value]' : value);

const getKey = (composKey, currentKey) => (
  composKey === '' ? `${currentKey}` : `${composKey}.${currentKey}`
);

const collectionOfStrings = {
  unchanged: () => null,
  changed: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  added: (key, { value }) => `Property '${key}' was added with value: ${stringify(value)}`,
  deleted: (key) => `Property '${key}' was removed`,
  nested: (key, { children }) => passString(children, key),
};

const plain = (data, ancestry = '') => {
  const currentKey = ancestry;
  const { type, key } = data;
  const compositeKey = getKey(currentKey, key);
  return collectionOfStrings[type](compositeKey, data);
};

const passString = (data, ancestry) => `${data.map((el) => plain(el, ancestry)).filter((el) => el).join('\n')}`;
export default passString;
