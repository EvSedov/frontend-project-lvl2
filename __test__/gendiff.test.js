// import fs from 'fs';
import gendiff from '../src/gendiff';

const pathToBeforeJson = './__test__/__fixtures__/before.json';
const pathToAfterJson = './__test__/__fixtures__/after.json';
const pathToBeforeYaml = './__test__/__fixtures__/before.yml';
const pathToAfterYaml = './__test__/__fixtures__/after.yml';
const pathToBeforeIni = './__test__/__fixtures__/before.ini';
const pathToAfterIni = './__test__/__fixtures__/after.ini';
const result = '{\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
test.each([[pathToBeforeJson, pathToAfterJson, result],
  [pathToBeforeYaml, pathToAfterYaml, result], [pathToBeforeIni, pathToAfterIni, result]])(
  'gendiff(%s, %s)',
  (pathBefore, pathAfter, expected) => {
    expect(gendiff(pathBefore, pathAfter)).toBe(expected);
  },
);
