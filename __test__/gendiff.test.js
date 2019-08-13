import gendiff from '../src/gendiff';

const pathToBeforeYaml = './__test__/__fixtures__/yml/before.yml';
const pathToAfterYaml = './__test__/__fixtures__/yml/after.yml';
const pathToBeforeIni = './__test__/__fixtures__/ini/before.ini';
const pathToAfterIni = './__test__/__fixtures__/ini/after.ini';
const pathToBeforeJson1 = './__test__/__fixtures__/json/before1.json';
const pathToAfterJson1 = './__test__/__fixtures__/json/after1.json';
const pathToBeforeJson2 = './__test__/__fixtures__/json/before2.json';
const pathToAfterJson2 = './__test__/__fixtures__/json/after2.json';
const result1 = `{
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
const result2 = `Property 'timeout' was updated. From 50 to 20
Property 'proxy' was removed
Property 'common.setting4' was removed
Property 'common.setting5' was removed
Property 'common.setting6.ops' was added with value: vops
Property 'common.setting2' was added with value: 200
Property 'common.sites' was added with value: hexlet.io
Property 'group1.baz' was updated. From bars to bas
Property 'group3' was removed
Property 'verbose' was added with value: true
Property 'group2' was added with value: [complex value]
`;

test.each([[pathToBeforeYaml, pathToAfterYaml, result1], [pathToBeforeIni, pathToAfterIni, result1], [pathToBeforeJson1, pathToAfterJson1, result1]])('gendiff(%s, %s)', (pathBefore, pathAfter, expected) => {
  expect(gendiff(pathBefore, pathAfter)).toBe(expected);
});
test('format plain', () => {
  expect(gendiff(pathToBeforeJson2, pathToAfterJson2, 'plain')).toBe(result2);
});
