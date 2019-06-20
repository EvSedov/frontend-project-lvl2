import _ from 'lodash';

const fileBefore = {
  common: {
    setting1: 'Value 1',
    setting2: '200',
    setting3: true,
    setting6: {
      key: 'value',
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: '12345',
  },
};
const fileAfter = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: {
      key: 'value',
    },
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
    },
  },

  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },

  group3: {
    fee: '100500',
  },
};

const buildDifAST = (fileContentBefore, fileContentAfter) => {
  const keysBefore = Object.keys(fileContentBefore);
  const keysAfter = Object.keys(fileContentAfter);
  const keys = _.uniq([...keysBefore, ...keysAfter]);
  return keys.reduce((acc, key) => {
    if (_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      if (fileContentBefore[key] === fileContentAfter[key]) {
        acc.push({
          type: 'unchanged',
          key,
          value: fileContentBefore[key],
        });
      } else if (typeof fileContentBefore[key] === 'object' && typeof fileContentAfter[key] === 'object') {
        acc.push({
          type: 'nested',
          key,
          children: buildDifAST(fileContentBefore[key], fileContentAfter[key]),
        });
      } else {
        acc.push({
          type: 'changed',
          key,
          oldValue: fileContentBefore[key],
          newValue: fileContentAfter[key],
        });
      }
    }
    if (!_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      acc.push({
        type: 'added',
        key,
        value: fileContentAfter[key],
      });
    }
    if (_.has(fileContentBefore, key) && !_.has(fileContentAfter, key)) {
      acc.push({
        type: 'deleted',
        key,
        value: fileContentBefore[key],
      });
    }
    return acc;
  }, []);
};
const obj = buildDifAST(fileBefore, fileAfter);
console.log(obj);
console.log('\n\n');
console.log(obj[0].children);
console.log('\n\n');
console.log(obj[1].children);
