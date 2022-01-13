const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});
        if (posts === null) {
            res.status(400).send({
                success: false
            });
        } else {
            res.send(posts);
        }
    } catch (err) {
        res.status(400).send({
            success: false
        });
    }
})

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        await post.save().then(() => {
            res.status(201).send({
                success: true,
                message: "Post saved",
                data: post
            })
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: err.message
        });
    }
})

router.get('/:id', async (req, res) => {
    if (req.params.id.length === 24) {
        const post = await Post.findOne({
            _id: req.params.id
        });
        if (post === null) {
            res.status(404).send({
                success: false,
                message: 'Post not found with this id : ' + req.params.id
            });
        } else {
            res.status(200).send({
                success: true,
                data: post
            });
        }
    } else {
        res.status(400).send({
            success: false,
            message: 'Id must be 24 characters long!'
        })
    }
})

router.put('/:id', async (req, res) => {
    if (req.params.id.length === 24) {
        try {
            await Post.findByIdAndUpdate(req.params.id, req.body)
            const updatedPost = await Post.findById(req.params.id)
            res.status(200).send({
                success: true,
                message: "Post updated.",
                data: updatedPost
            });

        } catch (err) {
            res.status(400).send({
                success: false
            })
        }
    } else {
        res.status(400).send({
            success: false,
            message: 'Id must be 24 characters long!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    if (req.params.id.length === 24) {
        try {
            await Post.findByIdAndRemove({
                _id: req.params.id
            }).then(() => {
                res.send({
                    success: true,
                    message: 'Post deleted successfully!'
                })
            })
        } catch (err) {
            res.status(400).send({
                success: false,
                message: err.message
            });
        }
    } else {
        res.status(400).send({
            success: false,
            message: 'Id must be 24 characters long!'
        })
    }
})

module.exports = router;