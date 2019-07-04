import gendiff from '../src/gendiff';
import resultRecurs from './__fixtures__/resultRecurs';

const pathToBeforeYaml = './__test__/__fixtures__/yml/before.yml';
const pathToAfterYaml = './__test__/__fixtures__/yml/after.yml';
const pathToBeforeIni = './__test__/__fixtures__/ini/before.ini';
const pathToAfterIni = './__test__/__fixtures__/ini/after.ini';
const result = '{\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
test.each([[pathToBeforeYaml, pathToAfterYaml, result], [pathToBeforeIni, pathToAfterIni, result]])(
  'gendiff(%s, %s)',
  (pathBefore, pathAfter, expected) => {
    expect(gendiff(pathBefore, pathAfter)).toBe(expected);
  },
);
const pathToBeforeJson = './__test__/__fixtures__/before.json';
const pathToAfterJson = './__test__/__fixtures__/after.json';
test('рекурсивное сравнение данных', () => {
  expect(gendiff(pathToBeforeJson, pathToAfterJson)).toBe(resultRecurs);
});
