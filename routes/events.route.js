const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');
const { newEventValidator } = require('../middlewares/checkValidators');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

// validate routes below with JWT
router.use(validateJWT);

router.get('/', getEvents);
router.post('/new', newEventValidator(), createEvent);

router.put('/edit/:id', newEventValidator(), updateEvent);

router.delete('/delete/:id', deleteEvent);

module.exports = router;