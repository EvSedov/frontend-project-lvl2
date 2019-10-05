const json = (data) => {
  const strJson = JSON.stringify(data);
  return JSON.parse(strJson);
};
export default json;
