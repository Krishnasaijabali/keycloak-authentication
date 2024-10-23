import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
  discoveryApiRef,
  oauthRequestApiRef,
} from '@backstage/core-plugin-api';
import { createApiRef } from '@backstage/core-plugin-api';
import { OAuth2 } from '@backstage/core-app-api'; 

export const keycloakAuthApiRef = createApiRef({
  id: 'plugin.auth-backend.keycloak',
  
});

export const apis: AnyApiFactory[] = [
  
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  ScmAuth.createDefaultApiFactory(),
 
    // Other API factories...
    createApiFactory({
      api: keycloakAuthApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        oauthRequestApi: oauthRequestApiRef,
        configApi: configApiRef,
      },
      factory: ({configApi, oauthRequestApi, discoveryApi}) =>
        OAuth2.create({
          configApi,
          discoveryApi,
          oauthRequestApi,
          provider: {
              title: 'keycloak custom provider',
              id: 'keycloak',  // Unique identifier for Keycloak OIDCtitle: 'Keycloak',
              icon: () =>null,  // You can add an icon component if needed
          },
          environment: configApi.getOptionalString('auth.environment'),
          defaultScopes: ['openid', 'profile', 'email'],
          popupOptions: {
          // optional, used to customize login in popup size
          size: {
            fullscreen: true,
          },
          /**
           * or specify popup width and height
           * size: {
              width: 1000,
              height: 1000,
            }
           */
        },
        }),
    }),
  
];
