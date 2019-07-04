const getDifference = data => data.map((elem) => {
  const { key } = elem;
  const value = (elem.type === 'nested') ? getDifference(elem.children) : elem.value;
  switch (elem.type) {
    case 'added':
      return { sign: '+', key, value: value[1] };
    case 'deleted':
      return { sign: '-', key, value: value[0] };
    case 'changed':
      return [{ sign: '-', key, value: value[0] }, { sign: '+', key, value: value[1] }];
    case 'unchanged':
      return { sign: '', key, value: value[0] };
    case 'nested':
      return { sign: '', key, value };
    default:
      console.log(elem.type);
      console.log('Unknown type.');
      break;
  }
  return undefined;
});

export default getDifference;
