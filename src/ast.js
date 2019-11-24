import _ from 'lodash';

const buildAST = (fileContentBefore, fileContentAfter) => {
  const before = fileContentBefore;
  const after = fileContentAfter;
  const keys = _.uniq([..._.keys(before), ..._.keys(after)]);
  return keys.map((key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (before[key] === after[key]) {
        return {
          type: 'unchanged', sign: '', key, value: before[key],
        };
      }
      if (typeof before[key] === 'object' && typeof after[key] === 'object') {
        return {
          type: 'nested', sign: '', key, children: buildAST(before[key], after[key]),
        };
      }
      return {
        type: 'changed', sign: ['-', '+'], key, value: [before[key], after[key]],
      };
    }
    if (!_.has(before, key) && _.has(after, key)) {
      return {
        type: 'added', sign: '+', key, value: after[key],
      };
    }
    return {
      type: 'deleted', sign: '-', key, value: before[key],
    };
  });
};

export default buildAST;
