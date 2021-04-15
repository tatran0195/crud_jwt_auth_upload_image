const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");
require("dotenv").config();

function signUp(req, res) {
    const schema = {
        email: { type: "string", nullable: false },
        password: { type: "string", nullable: false },
    };

    const validator = new Validator();
    const validationResponse = validator.validate(
        { email: req.body.email, password: req.body.password },
        schema
    );

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse,
        });
    }

    models.User.findOne({ where: { email: req.body.email } })
        .then((result) => {
            if (result) {
                res.status(409).json({
                    message: "Email already exists!",
                });
            } else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(
                        req.body.password,
                        salt,
                        function (err, hash) {
                            const user = {
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                            };
                            models.User.create(user)
                                .then((result) => {
                                    res.status(200).json({
                                        message: "User created successfully!",
                                    });
                                })
                                .catch((error) => {
                                    res.status(500).json({
                                        message: "Something went wrong!",
                                    });
                                });
                        }
                    );
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
}

function login(req, res) {
    const schema = {
        email: { type: "string", nullable: false },
        password: { type: "string", nullable: false },
    };

    const validator = new Validator();
    const validationResponse = validator.validate(
        { email: req.body.email, password: req.body.password },
        schema
    );

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse,
        });
    }

    models.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (user === null) {
                res.status(401).json({
                    message: "Invalid credentials!",
                });
            } else {
                bcryptjs.compare(
                    req.body.password,
                    user.password,
                    function (err, result) {
                        if (result) {
                            const token = jwt.sign(
                                {
                                    email: user.email,
                                    userId: user.id,
                                },
                                process.env.JWT_KEY,
                                function (err, token) {
                                    res.status(200).json({
                                        message: `Authentication successful!`,
                                        token: token,
                                    });
                                }
                            );
                        } else {
                            res.status(401).json({
                                message: "Invalid credentials!",
                            });
                        }
                    }
                );
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
}

module.exports = { signUp, login };
