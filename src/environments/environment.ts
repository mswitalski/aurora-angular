// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    backendUrl: 'https://localhost:8443/api/v1/',
    loginUrl: 'https://localhost:8443/login',
    outlookLoginUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?'
        + 'client_id=1fe59cb2-fd3f-4ecf-a9e4-77dc1eea9004&response_type=token&'
        + 'redirect_uri=https%3A%2F%2Flocalhost%3A4200%2F&'
        + 'scope=openid%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.readwrite'
        + '&response_mode=fragment&state=outlook&nonce=678910',
    resultsOnPage: 20,
    adminRole: 'ADMIN',
    unitLeaderRole: 'UNIT_LEADER',
    employeeRole: 'EMPLOYEE',
    supportedLanguages: ['en', 'pl'],
    defaultLanguage: 'en',
    api: {
        header: 'Requester-Role',
        role: {
            admin: 'ADMIN',
            common: 'ANY',
            employee: 'EMPLOYEE',
            unitleader: 'UNIT_LEADER'
        }
    },
    handledErrorCodes: ['401', '403', '404', '412']
};
