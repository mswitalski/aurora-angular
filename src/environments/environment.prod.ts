export const environment = {
    production: true,
    backendUrl: 'http://localhost:8080/api/v1/',
    loginUrl: 'http://localhost:8080/login',
    outlookLoginUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=1fe59cb2-fd3f-4ecf-a9e4-77dc1eea9004&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&scope=openid%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.readwrite&response_mode=fragment&state=outlook&nonce=678910',
    resultsOnPage: 20,
    adminRole: 'ADMIN',
    unitLeaderRole: 'UNIT_LEADER',
    employeeRole: 'EMPLOYEE',

    'api': {
        'header': 'Requester-Role',
        'role': {
            'admin': 'ADMIN',
            'common': 'ANY',
            'employee': 'EMPLOYEE',
            'unitleader': 'UNIT_LEADER'
        }
    }
};
