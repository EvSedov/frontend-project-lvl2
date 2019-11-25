import stringify from './stringify';
import plain from './plain';
import json from './json';

// eslint-disable-next-line import/prefer-default-export
const formates = { plain, stringify, json };

export default arg => formates[arg];
