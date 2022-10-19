/// <reference types="svelte" />
/// <reference types="preact.d.ts" />

import type { JSX } from '@cosmos/web'
// Add Intrinsic Elements to allow Cosmos custom elements tag names to be used in JSX
type LocalIntrinsicElements = JSX.IntrinsicElements

declare global {
	namespace JSX {
		interface IntrinsicElements extends LocalIntrinsicElements {}
		declare module '*.jpeg'
		declare module '*.png'
		declare module '*.jpg'
		declare module '*.vue'
		declare module '*.svg' {
			const content: any
			export default content
		}
	}
}
