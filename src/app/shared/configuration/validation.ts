export const validationConstraints = {
    'duty': {
        'name': {
            'max': 100
        }
    },
    'evaluation': {
        'leaderExplanation': {
            'max': 200
        },
        'selfExplanation': {
            'max': 200
        }
    },
    'feedback': {
        'content': {
            'max': 200
        }
    },
    'skill': {
        'name': {
            'max': 50
        }
    },
    'training': {
        'name': {
            'max': 100
        },
        'type': {
            'max': 20
        },
        'location': {
            'max': 50
        },
        'description': {
            'max': 500
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
