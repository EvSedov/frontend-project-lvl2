const stringify = (data, numberOfSpaces = 0) => {
  const currentNumberOfSpaces = numberOfSpaces;
  const spasesAtInBeginning = ' '.repeat(currentNumberOfSpaces + 8);
  const spasesAtEnd = ' '.repeat(currentNumberOfSpaces + 4);
  const result = data.map((el) => {
    if (el instanceof Array) {
      const value0 = (el[0].value instanceof Object)
        ? `{\n${spasesAtInBeginning}${Object.keys(el[0].value).join()}: ${Object.values(el[0].value).join()}\n${spasesAtEnd}}`
        : el[0].value;
      const value1 = (el[1].value instanceof Object)
        ? `{\n${spasesAtInBeginning}${Object.keys(el[1].value).join()}: ${Object.values(el[1].value).join()}\n${spasesAtEnd}}`
        : el[1].value;
      return [`\n  ${' '.repeat(currentNumberOfSpaces)}${el[0].sign} ${el[0].key}: ${value0}`,
        `\n  ${' '.repeat(currentNumberOfSpaces)}${el[1].sign} ${el[1].key}: ${value1}`];
    }
    const value = (el.value instanceof Object)
      ? `{\n${spasesAtInBeginning}${Object.keys(el.value).join()}: ${Object.values(el.value).join()}\n${spasesAtEnd}}`
      : el.value;
    if (el.value instanceof Array) {
      return `\n  ${' '.repeat(currentNumberOfSpaces)}  ${el.key}: ${stringify(el.value, numberOfSpaces + 4)}`;
    }
    if (el.sign) {
      return `\n  ${' '.repeat(currentNumberOfSpaces)}${el.sign} ${el.key}: ${value}`;
    }
    return `\n  ${' '.repeat(currentNumberOfSpaces)}  ${el.key}: ${value}`;
  });
  const resultStr = `{${result}\n${' '.repeat(currentNumberOfSpaces)}}`;
  return resultStr.replace(/,/g, '');
};

export default stringify;
