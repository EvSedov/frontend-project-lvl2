import _ from 'lodash';

const getSpace = (num) => ' '.repeat(num * 4);

const getValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const currentValue = JSON.stringify(value, null, 6).replace(/"/g, '');
  return `{\n${getSpace(depth)}${currentValue.split('\n')[1]}\n${getSpace(depth)}  }`;
};

const parseForType = {
  added: ({ key, value }, depth) => `${getSpace(depth)}+ ${key}: ${getValue(value, depth)}`,

  changed: ({ key, value }, depth) => [
    `${getSpace(depth)}- ${key}: ${getValue(value[0], depth)}`,
    `${getSpace(depth)}+ ${key}: ${getValue(value[1], depth)}`,
  ].join('\n'),

  deleted: ({ key, value }, depth) => `${getSpace(depth)}- ${key}: ${getValue(value, depth)}`,

  nested: ({ key, children }, depth) => {
    // eslint-disable-next-line no-use-before-define
    const innerText = children.map((el) => stringify(el, depth + 1));
    return `${getSpace(depth)}  ${key}: {\n${innerText}\n  ${getSpace(depth)}}`;
  },

  unchanged: ({ key, value }, depth) => `${getSpace(depth)}  ${key}: ${getValue(value, depth)}`,
};

const stringify = (element, depth = 1) => {
  const { type } = element;
  return parseForType[type](element, depth);
};

export default (data) => `{\n${data.map((el) => stringify(el, 1))}\n}`.split(',').join('\n');
