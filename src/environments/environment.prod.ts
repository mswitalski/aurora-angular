export const environment = {
    production: true,
    backendUrl: 'http://localhost:8080/api/v1/',
    loginUrl: 'http://localhost:8080/login',
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
