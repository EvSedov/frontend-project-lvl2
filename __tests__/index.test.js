import { promises as fs } from 'fs';
import path from 'path';
import gendiff from '../src';

const formats = ['ini', 'json', 'yml'];
const getFixturePath = name => path.join(__dirname, '..', '__fixtures__', name);

let expectedStringify;
let expectedPlain;

beforeAll(async () => {
  expectedStringify = await fs.readFile(getFixturePath('resultStringify.txt'), 'utf-8');
  expectedPlain = await fs.readFile(getFixturePath('resultPlain.txt'), 'utf-8');
});

test.each(formats)('format stringify gendiff for %s', async (format) => {
  const fileBeforePath = getFixturePath(`before.${format}`);
  const fileAfterPath = getFixturePath(`after.${format}`);
  const actual = await gendiff(fileBeforePath, fileAfterPath, 'stringify');
  expect(actual).toBe(expectedStringify);
});

test.each(formats)('format plain gendiff for %s', async (format) => {
  const fileBeforePath = getFixturePath(`before.${format}`);
  const fileAfterPath = getFixturePath(`after.${format}`);
  const actual = await gendiff(fileBeforePath, fileAfterPath, 'plain');
  expect(actual).toBe(expectedPlain);
});
