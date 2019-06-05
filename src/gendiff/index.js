import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getPathAbsolute = pathToFile => ((path.isAbsolute(pathToFile))
  ? pathToFile : path.normalize(`${process.cwd()}/${pathToFile}`));

const gendiff = (filePathBefore, filePathAfter) => {
  const filePathBeforeAbsolute = getPathAbsolute(filePathBefore);
  const filePathAfterAbsolute = getPathAbsolute(filePathAfter);
  const fdBefore = fs.openSync(filePathBeforeAbsolute, 'r');
  const fdAfter = fs.openSync(filePathAfterAbsolute, 'r');
  const fileContentBefore = JSON.parse(fs.readFileSync(filePathBeforeAbsolute));
  const fileContentAfter = JSON.parse(fs.readFileSync(filePathAfterAbsolute));
  const keys = _.uniq([..._.keys(fileContentBefore), ..._.keys(fileContentAfter)]);
  let result = '';
  keys.forEach((key) => {
    if (_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      if (fileContentBefore[key] === fileContentAfter[key]) {
        result = `${result}\n   ${key}: ${fileContentBefore[key]}`;
      } else {
        result = `${result}\n - ${key}: ${fileContentBefore[key]}\n + ${key}: ${fileContentAfter[key]}`;
      }
    }
    if (!_.has(fileContentBefore, key) && _.has(fileContentAfter, key)) {
      result = `${result}\n + ${key}: ${fileContentAfter[key]}`;
    }
    if (_.has(fileContentBefore, key) && !_.has(fileContentAfter, key)) {
      result = `${result}\n - ${key}: ${fileContentBefore[key]}`;
    }
  });
  fs.closeSync(fdBefore);
  fs.closeSync(fdAfter);
  return `{\n${result}\n}`;
};
export default gendiff;
