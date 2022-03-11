const db = require('@config/db');
const log = require('@lib/catch-error');
const ErrorModel = require('@models/errorResponse');

const notification = {};

notification.send = async(req, res) => {
    const {  } = req.body;
};

module.exports = notification;
