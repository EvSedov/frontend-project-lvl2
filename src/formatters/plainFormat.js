/* eslint-disable no-use-before-define */
const getComplexValue = (value) => ((value instanceof Object) ? '[complex value]' : value);

const getKey = (composKey, currentKey) => (
  composKey === '' ? `${composKey}${currentKey}` : `${composKey}.${currentKey}`
);

const collectionOfStrings = {
  unchanged: () => '',
  changed: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${getComplexValue(oldValue)} to ${getComplexValue(newValue)}`,
  added: (key, { value }) => `Property '${key}' was added with value: ${getComplexValue(value)}`,
  deleted: (key) => `Property '${key}' was removed`,
  nested: (key, { children }) => passStrings(children, key),
};

const plain = (data, accKeys = '') => {
  const currentKey = accKeys;
  const { type, key } = data;
  const compositeKey = getKey(currentKey, key);
  return collectionOfStrings[type](compositeKey, data);
};

const passStrings = (data, accKeys) => `${data.map((el) => plain(el, accKeys)).filter((el) => el).join('\n')}`;
export default passStrings;
