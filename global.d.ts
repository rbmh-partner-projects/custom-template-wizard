/// <reference types="svelte" />
/// <reference types="preact.d.ts" />
declare module '*.vue' {
  // NOTE: ts-loader
  import { defineComponent } from 'vue'

  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module '*.jpeg';
declare module '*.png';
declare module '*.jpg';
declare module "*.svg" {
  const content: any;
  export default content;
}
