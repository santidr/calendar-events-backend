/*
    User routes / AUTH
    host + /api/auth
*/
const { Router } = require('express');
const { loginUser, createUser, renewAuthToken } = require('../controllers/auth.controller');
const { loginValidator, createUserValidator } = require('../middlewares/checkValidators');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.post('/', loginValidator(), loginUser);

router.post('/new', createUserValidator(), createUser);

router.get('/renew', validateJWT, renewAuthToken);

module.exports = router;