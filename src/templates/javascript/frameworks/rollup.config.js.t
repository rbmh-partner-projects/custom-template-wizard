import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import styles from 'rollup-plugin-styles';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import { img } from './imgPlugin';
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
      baseUrl: process.env.BASE_SSL_URL ?? 'localhost:3000'
    }),
  ],
}
