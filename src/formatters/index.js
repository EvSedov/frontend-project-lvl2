import stringify from './stringFormat';
import plain from './plainFormat';

const formats = { plain, stringify, json: JSON.stringify };

export default (formatName) => formats[formatName];
