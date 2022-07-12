const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

// validate routes below with JWT
router.use(validateJWT);

router.get('/', getEvents);
router.post('/new', createEvent);
router.put('/edit/:id', updateEvent);
router.delete('/delete/:id', deleteEvent);

module.exports = router;