import stringify from './stringify';
import plain from './plain';
import json from './json';

const formates = { plain, stringify, json };

export default arg => formates[arg];
