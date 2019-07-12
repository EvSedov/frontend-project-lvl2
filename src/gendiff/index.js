import fs from 'fs';
import path from 'path';
import parsers from '../lib/parsers';
import buildDifAST from '../lib/buildDifAST';
import getDifference from '../lib/getDifference';
import stringify from '../lib/stringify';

const getPathAbsolute = pathToFile => (path.isAbsolute(pathToFile)
  ? pathToFile : path.normalize(`${process.cwd()}/${pathToFile}`));

const gendiff = (filePathBefore, filePathAfter) => {
  const filePathBeforeAbsolute = getPathAbsolute(filePathBefore);
  const filePathAfterAbsolute = getPathAbsolute(filePathAfter);
  const fdBefore = fs.openSync(filePathBeforeAbsolute, 'r');
  const fdAfter = fs.openSync(filePathAfterAbsolute, 'r');
  const parsersBefore = parsers(filePathBefore);
  const parsersAfter = parsers(filePathAfter);
  const fileContentBefore = parsersBefore(fs.readFileSync(filePathBeforeAbsolute, 'utf-8'));
  const fileContentAfter = parsersAfter(fs.readFileSync(filePathAfterAbsolute, 'utf-8'));
  const ast = buildDifAST(fileContentBefore, fileContentAfter);
  const renderDif = getDifference(ast);
  const result = stringify(renderDif);
  fs.closeSync(fdBefore);
  fs.closeSync(fdAfter);
  console.log(result);
  return result;
};
export default gendiff;
