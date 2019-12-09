// eslint-disable-next-line import/prefer-default-export
const getValue = value => ((value instanceof Object) ? '[complex value]' : value);

const plain = (data, keys = []) => {
  const result = data.map((elem) => {
    const { type, key } = elem;
    let newStr;
    let pathFromKeys;
    if (type === 'changed') {
      const value0 = getValue(elem.value[0]);
      const value1 = getValue(elem.value[1]);
      keys.push(key);
      pathFromKeys = keys.join('.');
      keys.pop();
      newStr = `Property '${pathFromKeys}' was updated. From ${value0} to ${value1}\n`;
    } else {
      const value = getValue(elem.value);
      keys.push(key);
      pathFromKeys = keys.join('.');
      keys.pop();
      if (elem.children) {
        newStr = `${plain(elem.children, [...keys, key])}`;
      } else if (type === 'added') {
        newStr = `Property '${pathFromKeys}' was added with value: ${value}\n`;
      } else if (type === 'deleted') {
        newStr = `Property '${pathFromKeys}' was removed\n`;
      } else {
        newStr = '';
      }
    }
    return newStr;
  });
  const resultStr = `${result}`;
  return resultStr.replace(/,/g, '');
};
export default plain;
