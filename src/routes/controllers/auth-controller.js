const Users = require('../../models/user');

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {expressjwt: expJwt} = require("express-jwt");   

const signToken = _id => jwt.sign({ _id }, process.env.SECRET);

const User = {
    login: async (req,res) => {
        const { body } = req;
        console.log(body)

        try {
            const user = await Users.findOne({ username: body.username });
            if (!user) {
                res.status(401).send('This user dont exists!!!');
            } else {
                const isMatch = await bcrypt.compare(body.password, user.password) 
                if (isMatch) {
                    const signed = signToken(user._id);
                    res.status(200).send(signed)
                } else {
                    res.status(403).send('Username or password is incorrect!!!')
                }
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    register: async (req,res) => {
        const { body } = req;
        console.log(body);

        try {
            const isUser = await Users.findOne({ username: body.username });
            if (isUser) {
                res.status(401).send('This user already exists');
            }

            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(body.password, salt);
            const user = await Users.create({ username:body.username, password:hashed, salt })

            const signed = signToken(user._id);
            res.status(201).send(signed);
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }
}

const  validateJwt = expJwt({secret: process.env.SECRET, algorithms: ['HS256'] });
const findAndAssignUser = async (req, res, next) => {
    try {
        const user = await Users.findById(req.auth._id);
        if (!user) {
            return res.status(401).end();
        }
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

const authenticated = express.Router().use(validateJwt, findAndAssignUser); // joining middlewares

module.exports = { User, authenticated };