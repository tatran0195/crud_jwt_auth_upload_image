const models = require("../models");
const Validator = require("fastest-validator");

const save = (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: 1,
    };

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "500" },
        categoryId: { type: "number", optional: false },
    };

    const validator = new Validator();
    const validationResponse = validator.validate(post, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse,
        });
    }

    models.Post.create(post)
        .then((result) => {
            res.status(201).json({
                message: "Post created successfully",
                post: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error,
            });
        });
};

const show = (req, res) => {
    const id = req.params.id;

    models.Post.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Post not found!",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
};

const getAll = (req, res) => {
    models.Post.findAll()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
};

const update = (req, res) => {
    const id = req.params.id;
    const updatePost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    };

    const userId = 1;

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "500" },
        categoryId: { type: "number", optional: false },
    };

    const validator = new Validator();
    const validationResponse = validator.validate(updatePost, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed!",
            errors: validationResponse,
        });
    }

    models.Post.update(updatePost, { where: { id: id, userId: userId } })
        .then((result) => {
            res.status(200).json({
                message: "Post updated successfully!",
                post: updatePost,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error,
            });
        });
};

const destroy = (req, res) => {
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({ where: { id: id, userId: userId } })
        .then((result) => {
            res.status(200).json({
                message: "Post deleted successfully!",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
};

module.exports = { save, show, getAll, update, destroy };
