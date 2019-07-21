import stringify from './stringify';
import plain from './plain';

// eslint-disable-next-line import/prefer-default-export
const formatter = (arg) => {
  const currentFormater = (arg === 'plain') ? plain : stringify;
  return currentFormater;
};

export default formatter;
