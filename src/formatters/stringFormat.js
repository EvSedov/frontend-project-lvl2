import _ from 'lodash';

const TWO = 2;
const SIX = 6;

const setOfSigns = {
  added: '+',
  deleted: '-',
  changed: ['-', '+'],
};
const getSign = (object, type) => (object[type] ? object[type] : ' ');

const getValue = (numberOfSpacesBegin, numberOfSpacesEnd, value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const tabBegin = ' '.repeat(numberOfSpacesBegin);
  const tabEnd = ' '.repeat(numberOfSpacesEnd);
  const currentKey = Object.keys(value).join();
  const currentValue = Object.values(value).join();
  return `{\n${tabBegin}${currentKey}: ${currentValue}\n${tabEnd}}`;
};

const collectionOfStrings = {
  changed: (numberOfSpaces, signs, key, values) => [
    `\n${' '.repeat(numberOfSpaces)}${signs[0]} ${key}: ${values[0]}`,
    `\n${' '.repeat(numberOfSpaces)}${signs[1]} ${key}: ${values[1]}`,
  ],
  nested: (numberOfSpaces, sign, key, fn, children) => (
    `\n${' '.repeat(numberOfSpaces)}${sign} ${key}: ${fn(children, numberOfSpaces + TWO)}`
  ),
};
const getString = (numberOfSpaces, sign, key, value) => `\n${' '.repeat(numberOfSpaces)}${sign} ${key}: ${value}`;
const getStringFromCollection = (object, type) => (object[type] ? object[type] : getString);

const stringify = (data, numberOfSpaces = 0) => {
  const currentNumberOfSpaces = numberOfSpaces + TWO;
  const spacesAtInBeginning = currentNumberOfSpaces + SIX;
  const spacesAtEnd = currentNumberOfSpaces + TWO;
  const result = data.map((elem) => {
    const {
      type, key, value,
    } = elem;
    const sign = getSign(setOfSigns, type);
    const strValue = (type === 'changed')
      ? [
        getValue(spacesAtInBeginning, spacesAtEnd, value[0]),
        getValue(spacesAtInBeginning, spacesAtEnd, value[1]),
      ]
      : getValue(spacesAtInBeginning, spacesAtEnd, value);
    const setOfArgs = (type === 'nested')
      ? [currentNumberOfSpaces, sign, key, stringify, elem.children]
      : [currentNumberOfSpaces, sign, key, strValue];
    return getStringFromCollection(collectionOfStrings, type)(...setOfArgs);
  });
  const resultStr = `{${result}\n${' '.repeat(currentNumberOfSpaces - TWO)}}`;
  return resultStr.replace(/,/g, '');
};

export default stringify;
