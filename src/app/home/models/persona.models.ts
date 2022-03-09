import firebase from 'firebase/app';
import 'firebase/firestore';

export type WITHPERSONA_DATA = {
  ACCOUNT_ID?: string;
  DOCUMENTS?: {
    DRIVING_LICENSE?: DOCUMENT;
    ELETRONIC_ID?: DOCUMENT;
    ID?: DOCUMENT;
  };
  UPLOADED?: {
    DRIVING_LICENSE?: boolean;
    ELETRONIC_ID?: boolean;
    ID?: boolean;
  };
  ISCHECKING?: {
    DRIVING_LICENSE?: boolean;
    ELETRONIC_ID?: boolean;
    ID?: boolean;
  };
};

export type DOCUMENT = {
  BACK?: string | null;
  COMPLETED_AT?: firebase.firestore.Timestamp;
  DOCUMENT_NUMBER?: string;
  EXPIRATION_DATE?: firebase.firestore.Timestamp;
  FRONT?: string | null;
};

export type PERSONA_CLIENT = {
  templateId: string;
  templaceVersionId?: string;
  themeId?: string;
  environment: 'sandbox' | 'production';
  referenceId?: string;
  accountId?: string; // Se dichiaro il referenceId non posso metterlo
  language: string;
  fields: PERSONA_FIELDS;
  onLoad?: () => void;
  onReady: () => void;
  onCancel: (args: { inquiryId: string; sessionToken: string }) => void;
  // onCancel: () => { inquiryId: string; sessionToken: string };
  /*
    'application_error' : 0
    'invalid_config' : 400
    'unauthenticated' : 409
    'inactive_template' : 422
    'unknown' : number
  */
  onComplete: (args: {
    inquiryId: string;
    status: 'completed' | 'failed';
    fields: Record<string, unknown>;
  }) => void;
  onError: (args: { status: number; code: string }) => void;
  onEvent?: (args: {
    eventName: string;
    metadata: { id: string; status: string };
  }) => void;
  messageTargetOrigin?;
  parent?;
};

type PERSONA_FIELDS = {
  nameFirst?: string;
  nameLast?: string;
  birthdate?: string;
  addressStreet1?: string;
  addressCity?: string;
  addressSubdivision?: string;
  addressPostalCode?: string;
  addressCountryCode?: string;
  phoneNumber?: string;
  emailAddress?: string;
  customAttribute?: {
    UID?: string;
  };
};

export type PERSONA_CREATED_CLIENT = {
  open: () => void;
  cancel: (force: boolean) => void;
};
