const stringify = (data, numberOfSpaces = 0) => {
  const currentNumberOfSpaces = numberOfSpaces;
  const result = data.reduce((acc, el) => {
    if (el instanceof Array) {
      const value0 = (el[0].value instanceof Object)
        ? `{\n${' '.repeat(currentNumberOfSpaces + 6)}${Object.keys(el[0].value).join()}: ${Object.values(el[0].value).join()}\n${' '.repeat(currentNumberOfSpaces)}  }`
        : el[0].value;
      const value1 = (el[1].value instanceof Object)
        ? `{\n${' '.repeat(currentNumberOfSpaces + 6)}${Object.keys(el[1].value).join()}: ${Object.values(el[1].value).join()}\n${' '.repeat(currentNumberOfSpaces)}  }`
        : el[1].value;
      return [...acc, `\n${' '.repeat(currentNumberOfSpaces)}${el[0].sign} ${el[0].key}: ${value0}`,
        `\n${' '.repeat(currentNumberOfSpaces)}${el[1].sign} ${el[1].key}: ${value1}`];
    }
    const value = (el.value instanceof Object)
      ? `{\n${' '.repeat(currentNumberOfSpaces + 6)}${Object.keys(el.value).join()}: ${Object.values(el.value).join()}\n${' '.repeat(currentNumberOfSpaces)}  }`
      : el.value;
    if (el.value instanceof Array) {
      return [...acc, `\n${' '.repeat(currentNumberOfSpaces)}  ${el.key}: ${stringify(el.value, numberOfSpaces + 4)}`];
    }
    if (el.sign) {
      return [...acc, `\n${' '.repeat(currentNumberOfSpaces)}${el.sign} ${el.key}: ${value}`];
    }
    return [...acc, `\n${' '.repeat(currentNumberOfSpaces)}  ${el.key}: ${value}`];
  }, []);
  const resultStr = `{${result}\n${' '.repeat((currentNumberOfSpaces > 0) ? currentNumberOfSpaces - 2 : currentNumberOfSpaces)}}`;
  return resultStr.replace(/,/g, '');
};

export default stringify;
