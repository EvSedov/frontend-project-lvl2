/* eslint-disable no-use-before-define */
<<<<<<< HEAD:src/formatters/plain.js
const getValue = (value) => ((value instanceof Object) ? '[complex value]' : value);
=======
const stringify = (value) => ((value instanceof Object) ? '[complex value]' : value);
>>>>>>> 23c554ff3cfc209a894bf132056ca202773df73d:src/formatters/plainFormat.js

const getKey = (composKey, currentKey) => (
  composKey === '' ? `${currentKey}` : `${composKey}.${currentKey}`
);

const collectionOfStrings = {
  unchanged: () => null,
<<<<<<< HEAD:src/formatters/plain.js
  changed: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`,
  added: (key, { value }) => `Property '${key}' was added with value: ${getValue(value)}`,
  deleted: (key) => `Property '${key}' was removed`,
  nested: (key, { children }) => plain(children, key),
};

const stringify = (data, ancestry = '') => {
=======
  changed: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  added: (key, { value }) => `Property '${key}' was added with value: ${stringify(value)}`,
  deleted: (key) => `Property '${key}' was removed`,
  nested: (key, { children }) => passString(children, key),
};

const plain = (data, ancestry = '') => {
>>>>>>> 23c554ff3cfc209a894bf132056ca202773df73d:src/formatters/plainFormat.js
  const currentKey = ancestry;
  const { type, key } = data;
  const compositeKey = getKey(currentKey, key);
  return collectionOfStrings[type](compositeKey, data);
};

<<<<<<< HEAD:src/formatters/plain.js
const plain = (data, ancestry) => data.map((el) => stringify(el, ancestry)).filter((el) => el).join('\n');
export default plain;
=======
const passString = (data, ancestry) => `${data.map((el) => plain(el, ancestry)).filter((el) => el).join('\n')}`;
export default passString;
>>>>>>> 23c554ff3cfc209a894bf132056ca202773df73d:src/formatters/plainFormat.js
