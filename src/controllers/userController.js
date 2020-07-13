"use strict";

const userModel = require('../models/userModel');


const create = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });

    try {
        let shopReq = await userModel.create(req.body);

        return res.status(201).json(shopReq)
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let shopReq = await userModel.findById(req.params.id).exec();

        if (!shopReq) return res.status(404).json({
            error: 'Not Found',
            message: 'Shopping request not found'
        });

        return res.status(200).json(shopReq)
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad request',
            message: 'The request body is empty'
        })
    }

    try {
        let shopReq = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(shopReq);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await userModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({ message: "Shopping request w/ id " + res.params.id + " was deleted" });
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async (req, res) => {
    try {
        let shopRequests = await userModel.find({}).exec();

        return res.status(200).json(shopRequests);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

module.exports = {
    create,
    read,
    update,
    remove,
    list
};