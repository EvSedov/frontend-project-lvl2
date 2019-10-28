import fs from 'fs';
import path from 'path';
import getParser from './getParser';
import buildDifAST from './buildDifAST';
import getDifference from './getDifference';
import getDataFormat from './formatters';

const getPathAbsolute = pathToFile => (path.isAbsolute(pathToFile) ? pathToFile : path.normalize(`${process.cwd()}/${pathToFile}`));

const gendiff = (filePathBefore, filePathAfter, format) => {
  const filePathBeforeAbsolute = getPathAbsolute(filePathBefore);
  const filePathAfterAbsolute = getPathAbsolute(filePathAfter);
  const parsersBefore = getParser(filePathBefore);
  const parsersAfter = getParser(filePathAfter);
  const fileContentBefore = parsersBefore(fs.readFileSync(filePathBeforeAbsolute, 'utf-8'));
  const fileContentAfter = parsersAfter(fs.readFileSync(filePathAfterAbsolute, 'utf-8'));
  const ast = buildDifAST(fileContentBefore, fileContentAfter);
  const renderDif = getDifference(ast);
  const result = getDataFormat(format)(renderDif);
  if (format === 'stringify') {
    console.dir(result, { showHidden: false, depth: null, colors: true });
  } else {
    console.log(result);
  }
  return result;
};
export default gendiff;
