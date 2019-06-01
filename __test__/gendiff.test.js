import gendiff from '../dist/gendiff';

test('compares two configuration files and shows a difference', () => {
  const beforeJson = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const afterJson = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  const result = '{host: hexlet.io, + timeout: 20, - timeout: 50, - proxy: 123.234.53.22, + verbose: true, - follow: false}';
  expect(gendiff(beforeJson, afterJson)).toBe(result);
});
