import stringify from './stringify';
import plain from './plain';

const formates = { plain, stringify, json: JSON.stringify };

export default arg => formates[arg];
