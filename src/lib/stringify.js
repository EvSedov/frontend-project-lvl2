import ast from './buildDifAST';
import render from './getDifference';

const fileBefore = {
  common: {
    setting1: 'Value 1',
    setting2: '200',
    setting3: true,
    setting6: {
      key: 'value',
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: '12345',
  },
};
const fileAfter = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: {
      key: 'value',
    },
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
    },
  },

  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },

  group3: {
    fee: '100500',
  },
};

const stringify = (data, numberOfSpaces = 0) => {
  const currentNumberOfSpaces = numberOfSpaces;
  const result = data.reduce((acc, el) => {
    const value = (el.value instanceof Object)
      ? `{\n${' '.repeat(currentNumberOfSpaces)}    ${Object.keys(el.value).join()}: ${Object.values(el.value).join()}\n${' '.repeat(currentNumberOfSpaces)}  }`
      : el.value;
    if (el instanceof Array) {
      const value0 = (el[0].value instanceof Object)
        ? `{\n${' '.repeat(currentNumberOfSpaces)}    ${Object.keys(el[0].value).join()}: ${Object.values(el[0].value).join()}\n${' '.repeat(currentNumberOfSpaces)}  }`
        : el[0].value;
      const value1 = (el[1].value instanceof Object)
        ? `{\n${' '.repeat(currentNumberOfSpaces)}    ${Object.keys(el[1].value).join()}: ${Object.values(el[1].value).join()}\n${' '.repeat(currentNumberOfSpaces)}  }`
        : el[1].value;
      return [...acc, `\n${' '.repeat(currentNumberOfSpaces)}${el[0].sign} ${el[0].key}: ${value0}`,
        `\n${' '.repeat(currentNumberOfSpaces)}${el[1].sign} ${el[1].key}: ${value1}`];
    }
    if (el.value instanceof Array) {
      return [...acc, `\n${' '.repeat(currentNumberOfSpaces)}  ${el.key}: ${stringify(el.value, numberOfSpaces + 4)}`];
    }
    if (el.sign) {
      return [...acc, `\n${' '.repeat(currentNumberOfSpaces)}${el.sign} ${el.key}: ${value}`];
    }
    return [...acc, `\n${' '.repeat(currentNumberOfSpaces)}  ${el.key}: ${value}`];
  }, []);
  const resultStr = `{  ${result}\n${' '.repeat((currentNumberOfSpaces > 0) ? currentNumberOfSpaces - 2 : currentNumberOfSpaces)}}`;
  return resultStr.replace(/,/g, '');
};

export default stringify;

console.log(stringify(render(ast(fileBefore, fileAfter))));
