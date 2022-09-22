/// <reference types="svelte" />
/// <reference types="preact.d.ts" />
declare module '*.vue' {
  // NOTE: ts-loader
  import { defineComponent } from 'vue'

  const component: ReturnType<typeof defineComponent>
  export default component
}

import type { JSX } from "@cosmos/web";
// Add Intrinsic Elements to allow Cosmos custom elements tag names to be used in JSX
type LocalIntrinsicElements = JSX.IntrinsicElements;

declare global {
  namespace JSX {
    interface IntrinsicElements extends LocalIntrinsicElements {}
    declare module '*.jpeg';
    declare module '*.png';
    declare module '*.jpg';
    declare module "*.svg" {
      const content: any;
      export default content;
    }
  }
}

declare module '*.jpeg';
declare module '*.png';
declare module '*.jpg';
declare module "*.svg" {
  const content: any;
  export default content;
}
