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

/**
 * @deprecated
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

/**
 * @deprecated
 * Interface for typescript implementation of UIM notification info
 *
 * @interface
 */
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

/**
 * @deprecated
 * Interface for typescript implementation of UIM notification info field
 *
 * @interface
 */
declare type UIMNotificationInfoField = {
  key: string;
  value: string;
  mandatory: boolean;
  type: string;
};

/**
 * @deprecated
 * Interface for typescript implementation of UIM notification user consent
 *
 * @interface
 */
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

/**
 * CDM Webhook Notification
 * @see https://engineering.redbull.com/cdm/webhook-notification
 */

declare type CDMWebhookNotification = {
  organizationType: "BEVERAGE" | "CORPORATE";
  createdAt: Date;
} & (CDMWebhookFormSubmitted | CDMWebhookFormSubmissionDeleted);

/**
 * CDM Webhook Form Submitted
 * @see https://engineering.redbull.com/cdm/webhook-notification#krdkS
 */
declare type CDMWebhookFormSubmitted = {
  type: "FORM_SUBMITTED";
  info: {
    fields: {
      first_name: string;
      last_name: string;
      email: string;
    } & { [key: string]: any };
    formSubmissionId: string;
    formAlias: string;
    externalFormId?: string;
    externalFormSubmissionId?: string;
    externalSystemId?: string;
    externalUploadedFiles?: string[];
    source?: string;
    lucidId: string;
    organizationType: CDMWebhookNotification["organizationType"];
    submittedAt: string;
    language: string; // ISO 639-1 Code
    country: string; // ISO 3166-1 Alpha2 Code
    userConsents: CDMWebhookUserConsent[];
  };
};

/**
 * CDM Webhook Form Submission Deleted
 * @see https://engineering.redbull.com/cdm/webhook-notification#A8ba0
 */
declare type CDMWebhookFormSubmissionDeleted = {
  type: "FORM_SUBMISSION_DELETED";
  info: {
    formSubmissionId: string;
    formAlias: string;
    externalFormId?: string;
    externalSystemId?: string;
  };
};

declare type CDMWebhookUserConsent = {
  documentId: string;
  mandatory: boolean;
  policyType: string;
  version: string;
  timeOfConsent: string;
  url: string;
  custom: boolean;
  policyText?: {
    documentId: string;
    version: string;
    url: string;
    text: string;
  };
};

export {
  CustomScriptRBAccountUser,
  UIMNotification,
  UIMNotificationUserConsent,
  UIMNotificationInfo,
  CustomScriptLightboxController,
  CustomScriptRBAccountsSDK,
  CDMWebhookNotification,
};
