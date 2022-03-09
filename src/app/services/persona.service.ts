import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PERSONA_CLIENT, PERSONA_CREATED_CLIENT } from '../models/persona.models';
import { LoadersManagerUtils } from '../utils/loadersManager.utils';

declare let Persona: {
  Client: new (arg0: PERSONA_CLIENT) => PERSONA_CREATED_CLIENT;
};

@Injectable({ providedIn: 'root' })
export class PersonaService {
  constructor(private loadersManager: LoadersManagerUtils) {}

  createEmbeddedInquiry = (): void => {
    void this.loadersManager.presentLoader().then(() => {
      let hasLoaded: boolean = false;

      const referenceId: string = 'myReferenceId';
      const USER = {
        NAME: 'NAME_TEST',
        SURNAME: 'SURNAME_TEST',
        EMAIL: 'test@cambieri.it',
        BIRTH_PLACE: { DATE: '01/01/1970' },
      };

      try {
        const fieldsForClient = {
          nameFirst: USER.NAME,
          nameLast: USER.SURNAME,
          emailAddress: USER.EMAIL,
          birthdate: USER.BIRTH_PLACE?.DATE,
        };

        console.log('[PersonaService]', '(createEmbeddedInquiry)', fieldsForClient);

        const personaClient = {
          templateId: environment.PERSONA_TEMPLATE_ID,
          environment: environment.PERSONA_ENVIRONMENT,
          referenceId,
          fields: fieldsForClient,
          language: 'it',
          onReady: () => {
            hasLoaded = true;
            console.log('[PersonaService]', '(onReady)');
            this.loadersManager.dismissLoader();
            client.open();
          },
          onComplete: ({ inquiryId, status, fields }) => {
            // Inquiry completed. Optionally tell your server about it.
            console.log('[PersonaService]', '(onComplete)', { inquiryId, status, fields });
          },
          onCancel: ({ inquiryId }) => {
            console.log('[PersonaService]', '(onCancel)', inquiryId);
            this.loadersManager.dismissLoader();
          },
          onError: ({ code }) => {
            console.error('[PersonaService]', '(onError)', code);
            this.loadersManager.dismissLoader();
          },
          onEvent: (eventName) => {
            console.log('[PersonaService]', '(onEvent)', eventName);
          },
        } as PERSONA_CLIENT;

        const client = new Persona.Client(personaClient);

        setTimeout(() => {
          if (!hasLoaded) {
            this.loadersManager.dismissLoader();
            console.error('[PersonaService]', '(setTimeout)');
          }
        }, 10000);
      } catch (error) {
        console.error('[PersonaService]', '(tryCatch)', error);
        this.loadersManager.dismissLoader();
      }
    });
  };
}
