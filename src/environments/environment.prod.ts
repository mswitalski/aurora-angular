export const environment = {
    production: true,
    backendUrl: 'https://localhost:8443/api/v1/',
    loginUrl: 'https://localhost:8443/login',
    outlookLoginUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?'
        + 'client_id=1fe59cb2-fd3f-4ecf-a9e4-77dc1eea9004&response_type=token&'
        + 'redirect_uri=https%3A%2F%2Flocalhost%3A8443%2F&'
        + 'scope=openid%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.readwrite'
        + '&response_mode=fragment&state=outlook&nonce=678910', resultsOnPage: 20,
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
    handledErrorCodes: ['401', '403', '404', '412', '502']
};
