import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathToFileResultPlain = path.join(__dirname, '../__fixtures__/results/resultPlain.txt');
const pathToFileResultStringify = path.join(__dirname, '../__fixtures__/results/resultStringify.txt');
const resultPlain = fs.readFileSync(pathToFileResultPlain, 'utf-8');
const resultStringify = fs.readFileSync(pathToFileResultStringify, 'utf-8');

const pathToFileBeforeYaml = '__fixtures__/yml/before.yml';
const pathToFileAfterYaml = '__fixtures__/yml/after.yml';
const pathToFileBeforeIni = '__fixtures__/ini/before.ini';
const pathToFileAfterIni = '__fixtures__/ini/after.ini';
const pathToFileBeforeJson = '__fixtures__/json/before.json';
const pathToFileAfterJson = '__fixtures__/json/after.json';

test.each([
  [pathToFileBeforeYaml, pathToFileAfterYaml, resultStringify],
  [pathToFileBeforeIni, pathToFileAfterIni, resultStringify],
  [pathToFileBeforeJson, pathToFileAfterJson, resultStringify],
])('format stringify gendiff(%s, %s)', (pathBefore, pathAfter, expected) => {
  expect(gendiff(pathBefore, pathAfter, 'stringify')).toBe(expected);
});

test.each([
  [pathToFileBeforeYaml, pathToFileAfterYaml, resultPlain],
  [pathToFileBeforeIni, pathToFileAfterIni, resultPlain],
  [pathToFileBeforeJson, pathToFileAfterJson, resultPlain],
])('format plain gendiff(%s, %s)', (pathBefore, pathAfter, expected) => {
  expect(gendiff(pathBefore, pathAfter, 'plain')).toBe(expected);
});
