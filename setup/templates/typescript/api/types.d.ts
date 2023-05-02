declare type CustomScriptRBAccountsSDK = {
  RBAccounts: {
    onEvent: (
      eventName:
        | "signedIn"
        | "sessionChecked"
        | "signInStarted"
        | "signInCancelled"
        | "loggedOut",
      callback: () => void
    ) => void;
    removeEvent: (
      eventName:
        | "signedIn"
        | "sessionChecked"
        | "signInStarted"
        | "signInCancelled"
        | "loggedOut",
      callback: () => void
    ) => void;
    login: () => Promise<any>;
    logout: () => Promise<any>;
    getUser: () => CustomScriptRBAccountUser | null;
    profileHref: () => string;
    getJwt: () => Promise<string>;
    setToken: (config: any) => void;
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

/**
 * Interface for typescript implementation of UIM notification
 *
 * @interface
 */
declare type UIMNotification = {
  userId: string;
  siloUserId: string;
  applicationId: string;
  applicationName: string;
  createdAt: Date;
  type:
    | "APPLICATION_DEACTIVATED"
    | "REGISTERED"
    | "REGISTRATION_VERIFIED"
    | "PROFILE_UPDATED"
    | "FORM_SUBMISSION_DELETED";
};

declare type UIMNotificationInfo = {
  socialMediaAccounts: any[];
  accepted_newsletters: any[];
  formSubmissionId: string;
  origin: string;
  verifiedAt: Date;
  language: string;
  source: string;
  avatar: any;
  unmappedFields: any;
  rawRequest: string;
  externalFormId: number;
  externalSystemId: string;
  verificationPending: boolean;
  userType: string;
  fields: UIMNotificationInfoField[];
  lucidId: string;
  submittedAt: Date;
  formAlias: string;
  userConsents: UIMNotificationUserConsent[];
};

declare type UIMNotificationInfoField = {
  key: string;
  value: string;
  mandatory: boolean;
  type: string;
};

declare type UIMNotificationUserConsent = {
  masterDocumentId: string;
  documentId: string;
  title: string;
  mandatory: boolean;
  accepted: boolean;
  type: string;
  version: string;
  timeOfConsent: Date;
  url: string;
  custom: false;
  renderingType: string;
};

export {
  CustomScriptRBAccountUser,
  UIMNotification,
  UIMNotificationUserConsent,
  UIMNotificationInfo,
  CustomScriptLightboxController,
  CustomScriptRBAccountsSDK,
};
