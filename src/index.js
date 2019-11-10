import fs from 'fs';
import path from 'path';
import getParser from './parser';
import buildAST from './ast';
import getDifference from './difference';
import getDataFormat from './formatters';

const gendiff = (filePathBefore, filePathAfter, format) => {
  const filePathBeforeAbsolute = path.resolve(filePathBefore);
  const filePathAfterAbsolute = path.resolve(filePathAfter);
  const extnameBefore = path.extname(filePathBefore).slice(1);
  const extnameAfter = path.extname(filePathAfter).slice(1);
  const parseBefore = getParser(extnameBefore);
  const parseAfter = getParser(extnameAfter);
  const fileContentBefore = parseBefore(fs.readFileSync(filePathBeforeAbsolute, 'utf-8'));
  const fileContentAfter = parseAfter(fs.readFileSync(filePathAfterAbsolute, 'utf-8'));
  const ast = buildAST(fileContentBefore, fileContentAfter);
  const renderDiff = getDifference(ast);
  const result = getDataFormat(format)(renderDiff);
  return result;
};
export default gendiff;
