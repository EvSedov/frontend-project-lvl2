import gendiff from '../src';
import resultStringify from '../__fixtures__/results/resultStringify';
import resultPlain from '../__fixtures__/results/resultPlain';

const pathToFileBeforeYaml1 = '__fixtures__/yml/before1.yml';
const pathToFileAfterYaml1 = '__fixtures__/yml/after1.yml';
const pathToFileBeforeYaml2 = '__fixtures__/yml/before2.yml';
const pathToFileAfterYaml2 = '__fixtures__/yml/after2.yml';
const pathToFileBeforeIni1 = '__fixtures__/ini/before1.ini';
const pathToFileAfterIni1 = '__fixtures__/ini/after1.ini';
const pathToFileBeforeIni2 = '__fixtures__/ini/before2.ini';
const pathToFileAfterIni2 = '__fixtures__/ini/after2.ini';
const pathToFileBeforeJson1 = '__fixtures__/json/before1.json';
const pathToFileAfterJson1 = '__fixtures__/json/after1.json';
const pathToFileBeforeJson2 = '__fixtures__/json/before2.json';
const pathToFileAfterJson2 = '__fixtures__/json/after2.json';

test.each([
  [pathToFileBeforeYaml1, pathToFileAfterYaml1, resultStringify],
  [pathToFileBeforeIni1, pathToFileAfterIni1, resultStringify],
  [pathToFileBeforeJson1, pathToFileAfterJson1, resultStringify],
])('format stringify gendiff(%s, %s)', (pathBefore, pathAfter, expected) => {
  expect(gendiff(pathBefore, pathAfter, 'stringify')).toBe(expected);
});

test.each([
  [pathToFileBeforeYaml2, pathToFileAfterYaml2, resultPlain],
  [pathToFileBeforeIni2, pathToFileAfterIni2, resultPlain],
  [pathToFileBeforeJson2, pathToFileAfterJson2, resultPlain],
])('format plain gendiff(%s, %s)', (pathBefore, pathAfter, expected) => {
  expect(gendiff(pathBefore, pathAfter, 'plain')).toBe(expected);
});
