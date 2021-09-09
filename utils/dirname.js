import path from 'path';
import url from 'url';

// eslint-disable-next-line no-underscore-dangle,import/prefer-default-export
export const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
