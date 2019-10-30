import fs from 'fs';
import path from 'path';
import getParser from './getParser';
import buildDifAST from './buildDifAST';
import getDifference from './getDifference';
import getDataFormat from './formatters';

const gendiff = (filePathBefore, filePathAfter, format) => {
  const filePathBeforeAbsolute = path.resolve(filePathBefore);
  const filePathAfterAbsolute = path.resolve(filePathAfter);
  const parsersBefore = getParser(filePathBefore);
  const parsersAfter = getParser(filePathAfter);
  const fileContentBefore = parsersBefore(fs.readFileSync(filePathBeforeAbsolute, 'utf-8'));
  const fileContentAfter = parsersAfter(fs.readFileSync(filePathAfterAbsolute, 'utf-8'));
  const ast = buildDifAST(fileContentBefore, fileContentAfter);
  const renderDif = getDifference(ast);
  const result = getDataFormat(format)(renderDif);
  console.log(result);
  return result;
};
export default gendiff;
