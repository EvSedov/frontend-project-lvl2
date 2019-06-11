import yaml from 'js-yaml';
import path from 'path';

const parsers = (filePath) => {
  const fileExtension = path.extname(filePath);
  switch (fileExtension) {
    case '.yml':
      return yaml.safeLoad;
    default:
      return JSON.parse;
  }
};
export default parsers;
