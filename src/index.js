import fs from 'fs';
import path from 'path';
import getParser from './parser';
import buildDifAST from './buildDifAST';
import getDifference from './getDifference';
import getDataFormat from './formatters';

const gendiff = (filePathBefore, filePathAfter, format) => {
  const filePathBeforeAbsolute = path.resolve(filePathBefore);
  const filePathAfterAbsolute = path.resolve(filePathAfter);
  const extnameBefore = path.extname(filePathBefore).slice(1);
  const extnameAfter = path.extname(filePathAfter).slice(1);
  const parserBefore = getParser(extnameBefore);
  const parserAfter = getParser(extnameAfter);
  const fileContentBefore = parserBefore(fs.readFileSync(filePathBeforeAbsolute, 'utf-8'));
  const fileContentAfter = parserAfter(fs.readFileSync(filePathAfterAbsolute, 'utf-8'));
  const ast = buildDifAST(fileContentBefore, fileContentAfter);
  const renderDif = getDifference(ast);
  const result = getDataFormat(format)(renderDif);
  return result;
};
export default gendiff;
