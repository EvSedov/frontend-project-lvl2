import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  ini: ini.parse,
  yml: yaml.safeLoad,
};

export default (typeFormat) => parsers[typeFormat];
