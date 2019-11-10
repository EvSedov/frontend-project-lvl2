const getDifference = data => data.map((elem) => {
  const { key } = elem;
  const value = (elem.type === 'nested') ? getDifference(elem.children) : elem.value;
  let result;
  switch (elem.type) {
    case 'added':
      result = { sign: '+', key, value: value[1] };
      break;
    case 'deleted':
      result = { sign: '-', key, value: value[0] };
      break;
    case 'changed':
      result = [{ sign: '-', key, value: value[0] }, { sign: '+', key, value: value[1] }];
      break;
    case 'unchanged':
      result = { sign: '', key, value: value[0] };
      break;
    case 'nested':
      result = { sign: '', key, value };
      break;
    default:
      console.log(elem.type);
      console.log('Unknown type.');
      break;
  }
  return result;
});

export default getDifference;
