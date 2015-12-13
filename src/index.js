import ini from 'packagesmith.formats.ini';
import defaultsDeep from 'lodash.defaultsdeep';
import { runProvisionerSet } from 'packagesmith';
const defaultConfig = {
  root: 'true',
  '*': {
    'end_of_line': 'lf',
    'insert_final_newline': 'true',
    'trim_trailing_whitespace': 'true',
    'charset': 'utf-8',
    'indent_style': 'space',
    'indent_size': '2',
  },
};
export function editorConfigFile(config) {
  return {
    '.editorconfig': {
      contents: ini(
        (contents) => defaultsDeep(config || defaultConfig, contents),
        { whitespace: true }
      ),
    },
  };
}
export default editorConfigFile;

if (require.main === module) {
  runProvisionerSet(process.argv[2] || '.', editorConfigFile());
}
