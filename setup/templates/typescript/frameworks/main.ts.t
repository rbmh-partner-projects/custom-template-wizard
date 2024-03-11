{{ if (it.framework === 0 || it.framework === 2)  { }}
import './styles/main.less';
{{ } }}

{{ if (it.framework === 0)  { }}
import panel from './components/Card';
{{ } }}

{{ if (it.framework === 1)  { }}
import { render } from 'preact';
import './styles/cosmos.less';
import Card from './components/Card';
{{ } }}

{{ if (it.framework === 2)  { }}
import Card from './components/Card.svelte';
{{ } }}

{{ if (it.framework === 3)  { }}
import { createApp } from 'vue';
import App from './App.vue';
{{ } }}

{{ if (it.collectsUserData) { }}
import jotform from './utils/jotform.js';
{{ } }}

import {
  CustomScriptParams,
  CustomScript,
  CustomScriptRBAccountUser,
} from "./types";

export const { start, attach }: CustomScript = {
  /*
   * The start function is called when the custom script panel is rendered 
   * (e.g. when the user navigates to a page where the custom script is configured).
   * Do as much work as possible here, especially data loading. Contrary to attach(), 
   * the start method is asynchronous and any work done here delays the processing of subsequent panels. 
   * This minimizes layout shifts.
  */
  start: async (params: CustomScriptParams) => {
    /*
     * el:         contains the element the custom script can use to attach itself to
     * config:     contains everything from the scriptConfig in the XC
     * options:    contains some utility functions for custom scripts (see examples for more information)
    */
    const { el, config, options } = params;

    {{ if (it.framework === 0)  { }}
    el.appendChild(panel)
    {{ } }}

    {{ if (it.framework === 1) { }}
    render(<Card />, el);
    {{ } }}

    {{ if (it.framework === 2)  { }}
    const card = new Card({
      target: el
    });
    {{ } }} 

    {{ if (it.framework === 3)  { }}
    createApp(App).mount(el)
    {{ } }} 

    {{ if (it.collectsUserData) { }}
    /*
     * The following method shows an example of how to use the RBAccount SDK
     * Read more here: https://engineering.redbull.com/custom-development/auth0-wrapper-sdk-custom-template
     */

    const { RBAccounts: sdk, user } = await options.getRBAccount()

    // JotForm is initialized only when the user is logged in.
    if(user) {
      jotform.init(el, user);
    }

    // example of how to use the RBAccount SDK
    // the sdk can f.e. also be passed to the actual game or application to trigger some auth processes from different places
    // if (!user) {
    //   sdk.login();
    // }
 
    // If your app needs to persist any information before the login, make sure to save that information upfront, 
    // so you can access it after the user got redirected back. f.e.:
    // localStorage.setItem("info", "{clicked: true}");

    {{ } }}
  },
  /*
   * The attach function is called as soon as the custom script is ready to access the DOM elements. 
   * If you need to modify DOM elements, make sure to implement your desired behavior in this function 
   * to ensure that it doesn't access elements that are not yet set up in the DOM.
  */
  attach: () => { },
}

