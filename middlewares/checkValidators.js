const { check } = require('express-validator');
const validateFields = require('./validateFields');

const loginValidator = () => (
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 chars long').isLength({ min: 6 }),
        validateFields
    ]
);

const createUserValidator = () => (
    [
        check('name', 'Name field is required.').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 chars long').isLength({ min: 6 }),
        validateFields
    ]
);

module.exports = {
    loginValidator,
    createUserValidator
}