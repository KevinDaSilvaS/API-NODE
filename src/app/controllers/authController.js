const express = require('express');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');

const User = require('../models/user');

const router = express.Router();

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, { expiresIn: 90000 });
}

router.post('/register', async (req, res) => {
    const { email } = req;
    try {
        if(await User.findOne({ email })){
            return res.status(400).send({ error: 'given email belongs to another account'});
        }

        const user = await User.create(req.body);
        return res.send({ user, token: generateToken({id: user.id}) });

    } catch (error) {
        return res.status(400).send(
            {error, 
            info: 'check the parameters of the given request'
        });
    }
});

router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
       return res.status(400).send({
           info: "User not found"
       }); 
    }

    if (! await bcrypt.compare(password, user.password)) {
        return res.status(400).send({
            info: "Incorrect Password"
        }); 
    }

    user.password = undefined;

    res.send({
        user, token: generateToken({id: user.id})
    });
});

router.post('/forgot_password' ,async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send({
                info: "user not found"
            });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const now  = new Date;
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set':{
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });

        mailer.sendMail({
            to: email,
            from: 'testAPI-NODE@kevindasilva.com',
            template: 'forgot-email',
            context: { token }
        }, (err) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    info: 'Email could not be sent',
                    err
                })
            }

            return res.send(200)
        });
        
    } catch (error) {
        res.status(400).send({
            info: "unable to get email from requisition body"
        });
    }
})

router.patch('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

        if (!user) {
            res.status(400).send({ info: 'user not found' });
        }

        if (token !== user.passwordResetToken) {
            res.status(400).send({ info: 'wrong token informed' });
        }

        const now = new Date();

        if (now > user.passwordResetExpires) {
            res.status(400).send({ info: 'token already expired' });
        }

        user.password = password;

        await user.save(); 

        res.send();
        
    } catch (error) {
        res.status(400).send({ email, password, token, error, info: "error getting data from requisition body" });
    }
})

module.exports = (app) => {
    app.use('/auth', router)
}