/**
 * Interface for typescript implementation of custom scripts
 *
 * @interface
 */

declare type CustomScript = {
  /**
   * @param {CustomScriptParams} params - will be provided through the Red Bull custom script evaluator
   * @returns {void}} 
   */
  start: (params: CustomScriptParams) => void;

  /**
   * This function will be called from the RedBull custom script evaluator once the script got attached.
   */
  attach: () => void;
};

declare type CustomScriptParams = {
  /**
   * @property {any} config - contains everything from the scriptConfig in the XC
   */
  config: any;
  /**
   * @property {HTMLElement} el - contains the element the custom script can use to attach itself to
   */
  el: HTMLElement;
  /**
   * @property {CustomScriptOptions} options - contains some utility functions for custom scripts (see examples for more information)
   */
  options: CustomScriptOptions;
};

declare type CustomScriptOptions = {
  /**
   * @function getRBAccount - returns the current Red Bull account object
   * @returns {Promise<CustomScriptRBAccountsSDK>} - returns a promise with the Red Bull account object
   */
  getRBAccount: () => Promise<CustomScriptRBAccountsSDK>;
  /**
   * @function getRBAccountLoginMethod - returns the current Red Bull login method
   * @returns {CustomScriptRBAccountsSDK} - returns the current login method
   */
  getRBAccountLoginMethod: () => "redirect" | "embedded";
  /**
   * @function isServerSideRendering - checks if server side rendering is enabled
   * @returns {boolean}
   */
  isServerSideRendering: () => boolean;
  /**
   * @property {CustomScriptLightboxController} lightboxController - returns the currenct Lightbox Controller object
   */
  lightboxController: CustomScriptLightboxController;
  /**
   * @function openVideoTheater - opens the video theater
   * @param {any} a - Bla input
   */
  openVideoTheater: (a: any) => void;
  /**
   * @function renderInlineVideoPlayer - renders the inline video player
   * @param {any} a - Bla input
   * @param {any} b - Bla input
   * @param {any} c - Bla input
   */
  renderInlineVideoPlayer: (a: any, b: any, c: any) => void;
  /**
   * @function resolveImageUrl - resolves the image url for the given input
   * @param {any} e - Bla input
   */
  resolveImageUrl: (e: any) => void;
  /**
   * @function resolveTranslation - resolves a translation for a given key
   * @param {string} translationKey - the key of the translation you want to resolve, e.g: global.default_title
   */
  resolveTranslation: (translationKey: string, locale?: string) => string;
};

declare type CustomScriptRBAccountsSDK = {
  RBAccounts: {
    login: () => Promise<any>;
    logout: () => Promise<any>;
    getCurrentUser: () => Promise<CustomScriptRBAccountUser | null>;
    profileHref: () => string;
    getJwt: () => Promise<string>;
    linkSocialMediaAccount: (providerName: string) => Promise<void>;
    unlinkSocialMediaAccount: (providerName: string) => Promise<void>;
    checkSocialMediaAccount: (providerName: string) => Promise<boolean | null>;
    resendVerificationEmail: () => void;
    addUserFavorite: (contentId: string) => Promise<void>;
    deleteUserFavorite: (contentId: string) => Promise<void>;
    getUserFavorites: () => Promise<any>;
    getUserBookmarks: () => Promise<any>;
    getUserContinueWatching: (pageLimit: number) => Promise<any>;
    getUserInterests: () => Promise<any>;
    addUserZendeskTicket: (
      ticketId: string,
      ticketToken: string
    ) => Promise<void>;
  };
  user: CustomScriptRBAccountUser | null;
};

declare type CustomScriptRBAccountUser = {
  userProfile: {
    displayname: string;
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    social_provider_ids: any;
    verified: boolean;
    avatar_link?: string;
    thumbnail_link?: string;
  };
  userTokens: {
    access_token: string;
    id_token: string;
    refresh_token: string;
    uid: string;
  };
};

declare type CustomScriptLightboxController = {
  push: (item: any) => void | undefined;
  pop: () => any | undefined;
  popAll: () => any[] | undefined;
  getLastView: () => any | undefined;
};

export {
  CustomScriptRBAccountUser,
  CustomScriptLightboxController,
  CustomScriptRBAccountsSDK,
  CustomScript,
  CustomScriptParams,
};
