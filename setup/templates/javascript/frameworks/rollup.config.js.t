import {createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, statSync} from 'fs';
import {createFilter} from '@rollup/pluginutils';
import hasha from 'hasha';
import {basename, extname } from 'path';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import license from "rollup-plugin-license";
import styles from 'rollup-plugin-styles';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

{{ if (it.framework === 2)  { }}
import svelte from 'rollup-plugin-svelte';
{{ } }}
{{ if (it.framework === 3)  { }}
import vue from 'rollup-plugin-vue';
{{ } }}
dotenv.config({ path: '.env.redbull' })

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const PRODUCTION = ENVIRONMENT === 'production';
{{ if (it.framework === 0 || it.framework === 2 || it.framework === 3)  { }}
const inputFileFullPath = path.join('.', 'src', 'custom-script', 'main.js')
{{ } }}
{{ if (it.framework === 1)  { }}
const inputFileFullPath = path.join('.', 'src', 'custom-script', 'main.jsx')
{{ } }}

const mimeMap = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

const allowedLicenses = ['Apache-2.0', 'MIT', 'GPL-2.0+', 'BSD-2-Clause', 'BSD-3-Clause', 'MPL-2.0', 'LGPL-2.1+', '0BSD+', 'ISC+']

function img(opt = {}) {
  const extensions = opt.extensions || /\.(png|jpg|jpeg|gif|svg|webp)$/;
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

        const output = path.resolve(opt.output || ''); 

        if (!existsSync(output)) {
          const dirs = output.split('/');
          mkdirSync(output, {
            recursive: true
          })
        }
        let name = basename(id);

        if (opt.hash) {
          const code = readFileSync(id).toString();
          const hash = hasha(code, {algorithm: 'md5'});
          name = `${basename(id, ext)}-${hash}${ext}`;
        }
        const outputFile = path.resolve(output, name)
        const outputPath = output.split('/public').pop()
        createReadStream(id).pipe(createWriteStream(outputFile));

        // if statement to look if it is stagging, production... .env
        return `
          let img = "https://${opt.baseUrl}${outputPath}/${name}"
          export default img
          `.trim();
      }
    }
  }
}

export default {
  input: inputFileFullPath,
  output: {
    file: 'src/server/public/bundle.js',
    format: 'amd'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(PRODUCTION ? 'production' : 'development'),
      'process.env.REDBULL_ACCOUNT_TOKEN': PRODUCTION ? JSON.stringify(process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION ?? null) : JSON.stringify(process.env.REDBULL_ACCOUNT_TOKEN_STAGING ?? null),
      'process.env.JOTFORM_ID': PRODUCTION ? JSON.stringify(process.env.JOTFORM_ID ?? null) : JSON.stringify(process.env.JOTFORM_ID ?? null),
      'process.env.BASE_SSL_URL': JSON.stringify(process.env.BASE_SSL_URL ?? 'localhost:3000'),
      preventAssignment: false
    }),
    styles(),
    {{ if (it.framework === 2)  { }}
    svelte({
      compilerOptions: {
        // Enable run-time checks when not in production
        dev: !PRODUCTION,
      },
      emitCss: false,
    }),
    {{ } }}
    {{ if (it.framework === 3)  { }}
    vue({
      input: 'src/custom-script/main.js',
      css: false
    }),
    {{ } }}
    resolve({ browser: true }),
    babel({
      babelHelpers: 'runtime',
      exclude: /node_modules\/(?!svelte)/,
      extensions: ['.js', '.cjs', '.html', '.svelte', '.jsx'],
    }),
    commonjs(),
    PRODUCTION && terser(),

    img({
      hash: true,
      output: 'src/server/public/assets',
      _slash: true,
      exclude: 'node_modules/**',
      baseUrl: `${process.env.BASE_SSL_URL ?? "localhost:3000"}`,
    }),
    license({
      sourcemap: true,
      banner: {
        commentStyle: 'slash',
        content: `Bundle of <%= pkg.name %>
                  Created at <%= moment().toString() %>
                  Version: <%= pkg.version %>`
      },
      thirdParty: {
        allow(dependency) {
          const license = dependency.license;
          return dependency.name === '@cosmos/web-scoped' || allowedLicenses.includes(license);
        },
        includePrivate: true,
        output: {
          file: path.join(__dirname, '..', '..', 'LICENSE-CHECK.md'),
          encoding: 'utf-8',
          // Lodash template that can be defined to customize report output
          template: 
            `
            # Dependencies License Check
            <%_.forEach(dependencies, function (dependency){%>
- ***<%=dependency.name%>***: 
Version: <%=dependency.version%>, 
License: <ins><%=dependency.license%></ins>
            <%})%>
            `,
        },
      }
    })
  ],
}
