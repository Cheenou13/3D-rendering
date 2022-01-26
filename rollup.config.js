import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';

export default {
  input: '/index.js',
  output: {
    dir: 'output',
    format: 'es',
  },
  plugins: [importMetaAssets()],
};