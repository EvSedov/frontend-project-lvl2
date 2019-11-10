import _ from 'lodash';

const buildAST = (fileContentBefore, fileContentAfter) => {
  const keysBefore = Object.keys(fileContentBefore);
  const keysAfter = Object.keys(fileContentAfter);
  const keys = _.uniq([...keysBefore, ...keysAfter]);
  return keys.reduce((acc, key) => {
    if (_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      if (fileContentBefore[key] === fileContentAfter[key]) {
        acc.push({
          type: 'unchanged',
          key,
          value: [fileContentBefore[key], null],
          children: [],
        });
      } else if (typeof fileContentBefore[key] === 'object' && typeof fileContentAfter[key] === 'object') {
        acc.push({
          type: 'nested',
          key,
          value: [],
          children: buildAST(fileContentBefore[key], fileContentAfter[key]),
        });
      } else {
        acc.push({
          type: 'changed',
          key,
          value: [fileContentBefore[key], fileContentAfter[key]],
          children: [],
        });
      }
    }
    if (!_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      acc.push({
        type: 'added',
        key,
        value: [null, fileContentAfter[key]],
        children: [],
      });
    }
    if (_.has(fileContentBefore, key) && !_.has(fileContentAfter, key)) {
      acc.push({
        type: 'deleted',
        key,
        value: [fileContentBefore[key], null],
        children: [],
      });
    }
    return acc;
  }, []);
};

export default buildAST;
