import _ from 'lodash';

const buildAST = (fileContentBefore, fileContentAfter) => {
  const keysBefore = Object.keys(fileContentBefore);
  const keysAfter = Object.keys(fileContentAfter);
  const keys = _.uniq([...keysBefore, ...keysAfter]);
  return keys.map((key) => {
    if (_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      if (fileContentBefore[key] === fileContentAfter[key]) {
        return {
          type: 'unchanged', sign: '', key, value: fileContentBefore[key],
        };
      }
      if (typeof fileContentBefore[key] === 'object' && typeof fileContentAfter[key] === 'object') {
        return {
          type: 'nested', sign: '-+', key, children: buildAST(fileContentBefore[key], fileContentAfter[key]),
        };
      }
      return { type: 'changed', key, value: [fileContentBefore[key], fileContentAfter[key]] };
    }
    if (!_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      return {
        type: 'added', sign: '+', key, value: fileContentAfter[key],
      };
    }
    return {
      type: 'deleted', sign: '-', key, value: fileContentBefore[key],
    };
  });
};

export default buildAST;
