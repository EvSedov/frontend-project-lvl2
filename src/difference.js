const getDifference = data => data.map((elem) => {
  const { sign, key } = elem;
  const value = (elem.type === 'nested') ? getDifference(elem.children) : elem.value;
  let result;
  switch (elem.type) {
    case 'added':
      result = { sign, key, value };
      break;
    case 'deleted':
      result = { sign, key, value };
      break;
    case 'changed':
      result = [{ sign: sign[0], key, value: value[0] }, { sign: sign[1], key, value: value[1] }];
      break;
    case 'unchanged':
      result = { sign, key, value };
      break;
    case 'nested':
      result = { sign, key, value };
      break;
    default:
      console.log(elem.type);
      console.log('Unknown type.');
      break;
  }
  return result;
});

export default getDifference;
