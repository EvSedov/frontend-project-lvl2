import stringify from './stylish';
import plain from './plain';

const formats = { plain, stringify, json: JSON.stringify };

export default (formatName) => formats[formatName];
