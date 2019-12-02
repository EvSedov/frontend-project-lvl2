import fs from 'fs';
import path from 'path';
import getParser from './parser';
import buildAST from './ast';
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
  const result = getDataFormat(format)(ast);
  return result;
};
export default gendiff;
