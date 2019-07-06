import gendiff from '../src/gendiff';

const pathToBeforeYaml = './__test__/__fixtures__/yml/before.yml';
const pathToAfterYaml = './__test__/__fixtures__/yml/after.yml';
const pathToBeforeIni = './__test__/__fixtures__/ini/before.ini';
const pathToAfterIni = './__test__/__fixtures__/ini/after.ini';
const result = '{\n  host: hexlet.io\n- timeout: 50\n+ timeout: 20\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n}';
test.each([[pathToBeforeYaml, pathToAfterYaml, result], [pathToBeforeIni, pathToAfterIni, result]])(
  'gendiff(%s, %s)',
  (pathBefore, pathAfter, expected) => {
    expect(gendiff(pathBefore, pathAfter)).toBe(expected);
  },
);
const pathToBeforeJson = './__test__/__fixtures__/json/before.json';
const pathToAfterJson = './__test__/__fixtures__/json/after.json';
const resultRecurs = `{
  common: {
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: {
          key: value
      }
      setting6: {
          key: value
        + ops: vops
      }
    + follow: false
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
  }
+ group3: {
      fee: 100500
  }
}`;
test('рекурсивное сравнение данных', () => {
  expect(gendiff(pathToBeforeJson, pathToAfterJson)).toBe(resultRecurs);
});
