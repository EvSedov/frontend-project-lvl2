const stringify = (data, numberOfSpaces = 0) => {
  const currentNumberOfSpaces = numberOfSpaces;
  const spasesAtInBeginning = ' '.repeat(currentNumberOfSpaces + 8);
  const spasesAtEnd = ' '.repeat(currentNumberOfSpaces + 4);
  const result = data.map((elem) => {
    const {
      type, sign, key, value,
    } = elem;
    if (type === 'changed') {
      const strValue0 = (value[0] instanceof Object)
        ? `{\n${spasesAtInBeginning}${Object.keys(value[0]).join()}: ${Object.values(value[0]).join()}\n${spasesAtEnd}}`
        : value[0];
      const strValue1 = (value[1] instanceof Object)
        ? `{\n${spasesAtInBeginning}${Object.keys(value[1]).join()}: ${Object.values(value[1]).join()}\n${spasesAtEnd}}`
        : value[1];
      return [`\n  ${' '.repeat(currentNumberOfSpaces)}${sign[0]} ${key}: ${strValue0}`,
        `\n  ${' '.repeat(currentNumberOfSpaces)}${sign[1]} ${key}: ${strValue1}`];
    }
    const strValue = (value instanceof Object)
      ? `{\n${spasesAtInBeginning}${Object.keys(value).join()}: ${Object.values(value).join()}\n${spasesAtEnd}}`
      : value;
    if (type === 'nested') {
      return `\n  ${' '.repeat(currentNumberOfSpaces)}  ${key}: ${stringify(elem.children, numberOfSpaces + 4)}`;
    }
    return `\n  ${' '.repeat(currentNumberOfSpaces)}${sign} ${key}: ${strValue}`;
  });
  const resultStr = `{${result}\n${' '.repeat(currentNumberOfSpaces)}}`;
  return resultStr.replace(/,/g, '');
};

export default stringify;
