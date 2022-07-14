const Event = require('../models/Event');

const getEvents = async (req, res) => {

    try {
        const events = await Event.find().populate('user', 'name');

        res.status(200).json({
            ok: true,
            msg: 'getEvents',
            events
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error occurred while reading the events.'
        });
    }
}

const createEvent = async (req, res) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;

        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            msg: 'createEvents',
            event: savedEvent
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error occurred while creating a new event.'
        });
    }
}

const updateEvent = async (req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that id.'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'The current user does not have any privilege on this event.'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.status(201).json({
            ok: true,
            msg: 'updateEvent',
            event: updatedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error occurred while creating a new event.'
        });
    }
}

const deleteEvent = async (req, res) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);
        const uid = req.uid;

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that id.'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'The current user does not have any privilege on this event.'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error occurred while deleting an event.'
        });
    }
}

module.exports = {
    getEvents, createEvent, updateEvent, deleteEvent
}