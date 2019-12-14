import _ from 'lodash';

const signs = {
  added: '+',
  deleted: '-',
  changed: ['-', '+'],
};
const getSign = (object, type) => (object[type] ? object[type] : ' ');

const getValue = (tabBegin, tabEnd, value) => (
  (_.isObject(value))
    ? `{\n${' '.repeat(tabBegin)}${Object.keys(value).join()}: ${Object.values(value).join()}\n${' '.repeat(tabEnd)}}`
    : value
);

const collectorStrings = {
  changed: args => [
    `\n${' '.repeat(args[0])}${args[1][0]} ${args[2]}: ${args[3][0]}`,
    `\n${' '.repeat(args[0])}${args[1][1]} ${args[2]}: ${args[3][1]}`,
  ],
  nested: args => (
    `\n${' '.repeat(args[0])}${args[1]} ${args[2]}: ${args[3](args[4], args[0] + 2)}`
  ),
};
const getString = args => `\n${' '.repeat(args[0])}${args[1]} ${args[2]}: ${args[3]}`;
const getCollectorString = (object, type) => (object[type] ? object[type] : getString);

const stringify = (data, numberOfSpaces = 0) => {
  const currentNumberOfSpaces = numberOfSpaces + 2;
  const spacesAtInBeginning = currentNumberOfSpaces + 6;
  const spacesAtEnd = currentNumberOfSpaces + 2;
  const result = data.map((elem) => {
    const {
      type, key, value,
    } = elem;
    const sign = getSign(signs, type);
    const strValue = (type === 'changed')
      ? [
        getValue(spacesAtInBeginning, spacesAtEnd, value[0]),
        getValue(spacesAtInBeginning, spacesAtEnd, value[1]),
      ]
      : getValue(spacesAtInBeginning, spacesAtEnd, value);
    const args = (type === 'nested')
      ? [currentNumberOfSpaces, sign, key, stringify, elem.children]
      : [currentNumberOfSpaces, sign, key, strValue];
    return getCollectorString(collectorStrings, type)(args);
  });
  const resultStr = `{${result}\n${' '.repeat(currentNumberOfSpaces - 2)}}`;
  return resultStr.replace(/,/g, '');
};

export default stringify;
