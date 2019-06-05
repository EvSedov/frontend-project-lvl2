import fs from 'fs';
import gendiff from '../dist/gendiff';

test('compares two configuration files and shows a difference', () => {
  const pathToBefore = './__test__/__fixtures__/before.json';
  const pathToAfter = './__test__/__fixtures__/after.json';
  fs.openSync(pathToBefore, 'r');
  fs.openSync(pathToAfter, 'r');
  const result = '{\n\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
  expect(gendiff(pathToBefore, pathToAfter)).toBe(result);
});
