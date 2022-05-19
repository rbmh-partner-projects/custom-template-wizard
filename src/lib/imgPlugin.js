import {createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, statSync} from 'fs';
import {createFilter} from '@rollup/pluginutils';
import hasha from 'hasha';
import {basename, extname, relative} from 'path';

const mimeMap = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

export function img(opt = {}) {
  const extensions = opt.extensions || /\.(png|jpg|jpeg|gif|svg)$/;
  const filter = createFilter(opt.include, opt.exclude);

  return {
    name: 'image',
    load(id) {
      if (!filter(id)) return null;

      const ext = extname(id);
      if (!extensions.test(ext)) return null; // not an image

      if (statSync(id).size <= (opt.limit || 8192)) { // use base64
        return `export default "data:${mimeMap[ext]};base64,${readFileSync(id, 'base64')}"`;
      } else { //copy file to distPath
        const output = relative('./', opt.output) || '';
        if (!existsSync(output)) {
          const dirs = output.split('/');
          for (let i = 0, dir = dirs[0]; i < dirs.length; i++, dir += `/${dirs[i]}`) {
            if (dir !== '' && !existsSync(dir)) {
              mkdirSync(dir, {
                recursive: true
              })
            }
          }
        }
        let name = basename(id);

        if (opt.hash) {
          const code = readFileSync(id).toString();
          const hash = hasha(code, {algorithm: 'md5'});
          name = `${basename(id, ext)}-${hash}${ext}`;
        }
        const outputFile = `${output}/${name}`;
        createReadStream(id).pipe(createWriteStream(outputFile));

        // if statement to look if it is stagging, production... .env
        return `
          let img = "https://${opt.baseUrl}/assets/${name}"
          export default img
          `.trim();
      }
    }
  }
}
