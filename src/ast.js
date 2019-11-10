import _ from 'lodash';

const buildAST = (fileContentBefore, fileContentAfter) => {
  const keysBefore = Object.keys(fileContentBefore);
  const keysAfter = Object.keys(fileContentAfter);
  const keys = _.uniq([...keysBefore, ...keysAfter]);
  return keys.reduce((acc, key) => {
    let newAcc = acc;
    if (_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      if (fileContentBefore[key] === fileContentAfter[key]) {
        newAcc = [...acc, { type: 'unchanged', key, value: fileContentBefore[key] }];
      } else if (typeof fileContentBefore[key] === 'object' && typeof fileContentAfter[key] === 'object') {
        newAcc = [...acc, { type: 'nested', key, children: buildAST(fileContentBefore[key], fileContentAfter[key]) }];
      } else {
        newAcc = [...acc, { type: 'changed', key, value: [fileContentBefore[key], fileContentAfter[key]] }];
      }
    }
    if (!_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      newAcc = [...acc, { type: 'added', key, value: fileContentAfter[key] }];
    }
    if (_.has(fileContentBefore, key) && !_.has(fileContentAfter, key)) {
      newAcc = [...acc, { type: 'deleted', key, value: fileContentBefore[key] }];
    }
    return newAcc;
  }, []);
};

export default buildAST;
