const { check } = require('express-validator');
const validateFields = require('./validateFields');

// Auth fields validator
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

// Events fields validators
const newEventValidator = () => (
    [
        check('title', 'Title field is required.').not().isEmpty(),
        check('start', 'Start field is required.').isDate(),
        check('end', 'End field is required.').isDate(),
        validateFields
    ]
);

module.exports = {
    loginValidator,
    createUserValidator,
    newEventValidator
}