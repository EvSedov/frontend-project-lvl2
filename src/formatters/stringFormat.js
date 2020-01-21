import _ from 'lodash';

const setOfSigns = {
  added: '+',
  deleted: '-',
  changed: ['-', '+'],
};
const getSign = (object, type) => (object[type] ? object[type] : ' ');

const getSpace = num => ' '.repeat(num * 4);

const getValue = (value, depth) => {
  if (_.isObject(value)) {
    const currentValue = JSON.stringify(value, null, 6).replace(/"/g, '');
    return `{\n${getSpace(depth)}${currentValue.split('\n')[1]}\n${getSpace(depth)}  }`;
  }
  return value;
};

const parseForType = {
  changed: (signs, key, values, depth) => [
    `\n${getSpace(depth)}${signs[0]} ${key}: ${getValue(values[0], depth)}`,
    `\n${getSpace(depth)}${signs[1]} ${key}: ${getValue(values[1], depth)}`,
  ].join(''),

  nested: (sign, key, value, depth) => (
    // eslint-disable-next-line no-use-before-define
    `\n${getSpace(depth)}${sign} ${key}: {${value.map(el => stringify(el, depth + 1))}
  ${getSpace((depth))}}`
  ),
};

const parseForOthersType = (sign, key, value, depth) => `\n${getSpace(depth)}${sign} ${key}: ${getValue(value, depth)}`;

const getFuncForBuildString = (object, type) => (
  (object[type]) ? object[type] : parseForOthersType
);

const stringify = (element, depth = 1) => {
  const { type, key, value } = element;
  const currentValue = (element.children) ? element.children : value;
  const sign = getSign(setOfSigns, type);
  return getFuncForBuildString(parseForType, type)(sign, key, currentValue, depth);
};

export default data => `{${data.map(el => stringify(el, 1))}\n}`.split(',').join('');
