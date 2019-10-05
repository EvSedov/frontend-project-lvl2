import stringify from './stringify';
import plain from './plain';
import json from './json';

// eslint-disable-next-line import/prefer-default-export
export default (arg) => {
  switch (arg) {
    case 'plain':
      return plain;
    case 'stringify':
      return stringify;
    case 'json':
      return json;
    default:
      return plain;
  }
};
