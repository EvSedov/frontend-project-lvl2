import fs from 'fs';
import gendiff from '../src/gendiff';

test('compares two configuration files JSON and shows a difference', () => {
  const pathToBeforeJson = './__test__/__fixtures__/before.json';
  const pathToAfterJson = './__test__/__fixtures__/after.json';
  fs.openSync(pathToBeforeJson, 'r');
  fs.openSync(pathToAfterJson, 'r');
  const result = '{\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
  expect(gendiff(pathToBeforeJson, pathToAfterJson)).toBe(result);
});

test('compares two configuration files YAML and shows a difference', () => {
  const pathToBeforeYaml = './__test__/__fixtures__/before.yml';
  const pathToAfterYaml = './__test__/__fixtures__/after.yml';
  fs.openSync(pathToBeforeYaml, 'r');
  fs.openSync(pathToAfterYaml, 'r');
  const result = '{\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
  expect(gendiff(pathToBeforeYaml, pathToAfterYaml)).toBe(result);
});

test('compares two configuration files JSON and YAML and shows a difference', () => {
  const pathToBeforeJson = './__test__/__fixtures__/before.json';
  const pathToAfterYaml = './__test__/__fixtures__/after.yml';
  fs.openSync(pathToBeforeJson, 'r');
  fs.openSync(pathToAfterYaml, 'r');
  const result = '{\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
  expect(gendiff(pathToBeforeJson, pathToAfterYaml)).toBe(result);
});

test('compares two configuration files INI and shows a difference', () => {
  const pathToBeforeIni = './__test__/__fixtures__/before.ini';
  const pathToAfterIni = './__test__/__fixtures__/after.ini';
  fs.openSync(pathToBeforeIni, 'r');
  fs.openSync(pathToAfterIni, 'r');
  const result = '{\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
  expect(gendiff(pathToBeforeIni, pathToAfterIni)).toBe(result);
});
