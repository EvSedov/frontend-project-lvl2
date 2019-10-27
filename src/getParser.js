import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const getParser = (filePath) => {
  const fileExtension = path.extname(filePath);
  switch (fileExtension) {
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      return JSON.parse;
  }
};
export default getParser;
