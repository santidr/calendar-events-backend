/*
    User controllers / AUTH
    host + /api/auth
*/
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const genJWT = require('../helpers/jwt');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'The user with that email does not exist.'
            });
        }

        // Password validation
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect.'
            });
        }

        // Generate token
        const token = await genJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            msg: 'Logged in succesfuly.',
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error occurred while creating a new user.'
        });
    }
}

const createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'A user with that email already exists.'
            });
        }

        user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate token
        const token = await genJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: 'User created successfuly',
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error occurred while creating a new user.'
        });
    }
}

const renewAuthToken = async (req, res) => {

    const { uid, name } = req;

    // Generate JWT
    const token = await genJWT(uid, name);

    res.json({
        ok: true,
        msg: 'Renew auth token',
        token
    });
}

module.exports = {
    loginUser,
    createUser,
    renewAuthToken
}