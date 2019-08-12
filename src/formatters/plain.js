// eslint-disable-next-line import/prefer-default-export
const plain = (data, keys = []) => {
  const result = data.reduce((acc, el) => {
    let newStr;
    let pathFromKeys;
    if (el instanceof Array) {
      const value0 = (el[0].value instanceof Object) ? '[complex value]' : el[0].value;
      const value1 = (el[1].value instanceof Object) ? '[complex value]' : el[1].value;
      keys.push(el[0].key);
      pathFromKeys = keys.join('.');
      keys.pop();
      newStr = `Property '${pathFromKeys}' was updated. From ${value0} to ${value1}\n`;
    } else {
      const value = (el.value instanceof Object) ? '[complex value]' : el.value;
      keys.push(el.key);
      pathFromKeys = keys.join('.');
      keys.pop();
      if (el.value instanceof Array) {
        newStr = `${plain(el.value, [...keys, el.key])}`;
      } else if (el.sign === '+') {
        newStr = `Property '${pathFromKeys}' was added with value: ${value}\n`;
      } else if (el.sign === '-') {
        newStr = `Property '${pathFromKeys}' was removed\n`;
      } else {
        newStr = '';
      }
    }
    return [...acc, newStr];
  }, []);
  const resultStr = `${result}`;
  return resultStr.replace(/,/g, '');
};

export default plain;
