/* eslint-disable no-use-before-define */
const getComplexValue = (value) => ((value instanceof Object) ? '[complex value]' : value);
const getValue = (value) => (value instanceof Array
  ? [getComplexValue(value[0]), getComplexValue(value[1])] : getComplexValue(value));

const getKey = (composKey, currentKey) => (
  composKey === '' ? `${composKey}${currentKey}` : `${composKey}.${currentKey}`
);

const collectionOfStrings = {
  unchanged: () => '',
  changed: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`,
  added: (key, { value }) => `Property '${key}' was added with value: ${getValue(value)}`,
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
