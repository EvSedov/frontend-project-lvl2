// eslint-disable-next-line import/prefer-default-export
const plain = (data) => {
  const result = data.reduce((acc, el) => {
    if (el instanceof Array) {
      const value0 = (el[0].value instanceof Object) ? '[complex value]' : el[0].value;
      const value1 = (el[1].value instanceof Object) ? '[complex value]' : el[1].value;
      return [...acc, `Property '${el[0].key}' was updated. From ${value0} to ${value1}\n`];
    }
    const value = (el.value instanceof Object) ? '[complex value]' : el.value;
    if (el.value instanceof Array) {
      return [...acc, `${plain(el.value)}`];
    }
    if (el.sign === '+') {
      return [...acc, `Property '${el.key}' was added with value: ${value}\n`];
    }
    if (el.sign === '-') {
      return [...acc, `Property '${el.key}' was removed\n`];
    }
    return [...acc, ''];
  }, []);
  const resultStr = `${result}`;
  return resultStr.replace(/,/g, '');
};

export default plain;
