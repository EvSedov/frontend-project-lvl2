const getComplexValue = value => ((value instanceof Object) ? '[complex value]' : value);
const getValue = value => (value instanceof Array
  ? [getComplexValue(value[0]), getComplexValue(value[1])] : getComplexValue(value));

const getKey = (composKey, currentKey) => (
  composKey === '' ? `${composKey}${currentKey}` : `${composKey}.${currentKey}`
);

const collectionOfStrings = {
  unchanged: () => '',
  changed: args => `Property '${args[0]}' was updated. From ${args[1][0]} to ${args[1][1]}\n`,
  added: args => `Property '${args[0]}' was added with value: ${args[1]}\n`,
  deleted: args => `Property '${args[0]}' was removed\n`,
  nested: args => `${args[0](args[1], args[2])}`,
};
const getString = (object, type) => object[type];

const plain = (data, accKeys = '') => {
  const result = data.map((elem) => {
    const currentKey = accKeys;
    const { type, key, value } = elem;
    const strValue = getValue(value);
    const compositeKey = getKey(currentKey, key);
    const args = (type === 'nested')
      ? [plain, elem.children, compositeKey]
      : [compositeKey, strValue];
    return getString(collectionOfStrings, type)(args);
  });
  const resultStr = `${result}`;
  return resultStr.replace(/,/g, '');
};
export default plain;
