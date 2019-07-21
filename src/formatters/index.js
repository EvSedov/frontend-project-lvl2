import stringify from './stringify';
import plain from './plain';

// eslint-disable-next-line import/prefer-default-export
export default arg => ((arg === 'plain') ? plain : stringify);
