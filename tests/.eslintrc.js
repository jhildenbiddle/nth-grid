module.exports = {
    'env': {
        'jest/globals': true,
    },
    'extends': [
        'plugin:jest/recommended',
        'plugin:jest/style'
    ],
    'plugins': [
        'jest'
    ],
    'rules': {
        'jest/no-disabled-tests'    : 'warn',
        'jest/no-focused-tests'     : 'error',
        'jest/no-identical-title'   : 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect'         : 'error'
    }
};
