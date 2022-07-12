const Event = require('../models/Event')

const getEvents = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'getEvents'
    });
}

const createEvent = (req, res) => {

    const event = new Event(req.body);

    console.log(event);
    
    res.status(201).json({
        ok: true,
        msg: 'createEvents',
        event: req.body
    });
}

const updateEvent = (req, res) => {

    const { id } = req.params;

    res.status(201).json({
        ok: true,
        msg: 'updateEvent',
        event: {
            id
        }
    });
}

const deleteEvent = (req, res) => {

    const { id } = req.params;

    res.status(200).json({
        ok: true,
        msg: 'deleteEvent',
        event: {
            id
        }
    });
}

module.exports = {
    getEvents, createEvent, updateEvent, deleteEvent
}