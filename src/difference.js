const getDifference = data => data.map((elem) => {
  const { sign, key } = elem;
  const value = (elem.type === 'nested') ? getDifference(elem.children) : elem.value;
  let result;
  if (elem.type === 'changed') {
    result = [{ sign: sign[0], key, value: value[0] }, { sign: sign[1], key, value: value[1] }];
  } else {
    result = { sign, key, value };
  }
  return result;
});

export default getDifference;
