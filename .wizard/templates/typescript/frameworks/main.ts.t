import './styles/main.less';
{{ if (it.framework === 0)  { }}
import panel from './components/Card'
{{ } }}
{{ if (it.framework === 1)  { }}
import { render } from 'preact';
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

export const { start, attach }: CustomScript = {
  /*
   * The start function is called when the custom script panel is rendered 
   * (e.g. when the user navigates to a page where the custom script is configured).
   * This method must return a Promise that resolves with an object containing a stop function.
   * Do as much work as possible here, especially data loading. Contrary to attach(), 
   * the start method is asynchronous and any work done here delays the processing of subsequent panels. 
   * This minimizes layout shifts.
  */
  start: async (params) => {
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
     * Read more here: https://rb-account-sdk-prod.herokuapp.com/
     */
    const appToken = process.env.REDBULL_ACCOUNT_TOKEN

    if (appToken) {

      const { RBAccounts: sdk, user } = await options.getRBAccount()

      sdk.setToken({ application: appToken })

            // JotForm is initialized only when the user is logged in.
      if(user) {
        jotform.init(el, user);
      }

      sdk.onEvent('loggedOut', () => {
        // Do something after a user has logged out
      })

      sdk.onEvent('signedIn', async () => {
        const _user = await sdk.getUser()

        jotform.init(el, _user)
        // Do something after a user has logged in
      })
    }
    {{ } }}

    return Promise.resolve({
      /*
       * The stop function is called when the custom script panel is stopped (e.g. when the user navigates to a new page).
       * Any changes the custom script makes to the document must be undone in this method, 
       * otherwise they persist and may break following page visits. 
       * This includes changes to panels, as panels can be reused on the following page under certain circumstances.
       * Please do any clean-up necessary so all traces that were here are gone.
      */
      stop: () => {
        console.log('stop');
      }
    });
  },
  /*
   * The attach function is called as soon as the custom script is ready to access the DOM elements. 
   * If you need to modify DOM elements, make sure to implement your desired behavior in this function 
   * to ensure that it doesn't access elements that are not yet set up in the DOM.
  */
  attach: () => { },
}

