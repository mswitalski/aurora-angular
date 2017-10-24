export const validationConstraints = {
    'duty': {
        'name': {
            'max': 100
        }
    },
    'user': {
        'username': {
            'min': 2,
            'max': 20
        },
        'password': {
            'min': 3,
            'max': 60
        },
        'email': {
            'max': 40
        },
        'name': {
            'min': 3,
            'max': 20
        },
        'surname': {
            'min': 3,
            'max': 30
        },
        'position': {
            'min': 2,
            'max': 40
        },
        'goals': {
            'max': 200
        }
    }
};
