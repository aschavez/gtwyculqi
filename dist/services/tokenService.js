"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.signInToken = void 0;
const aws_sdk_1 = require("aws-sdk");
const crypto_1 = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
const signInToken = (cardData, res) => {
    const tokenId = (0, crypto_1.randomUUID)();
    const docClient = new aws_sdk_1.DynamoDB.DocumentClient();
    docClient.put({
        TableName: process.env.DYNAMO_TABLE_NAME,
        Item: Object.assign({ key: tokenId }, cardData),
    }, (err, _data) => {
        if (err) {
            return res.status(500).json('Error with saving token');
        }
        else {
            const token = (0, jsonwebtoken_1.sign)({ id: tokenId }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1m' });
            return res.json({ token: token });
        }
    });
};
exports.signInToken = signInToken;
const validateToken = (tokenData, res) => {
    const docClient = new aws_sdk_1.DynamoDB.DocumentClient();
    (0, jsonwebtoken_1.verify)(tokenData.token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        else {
            docClient.get({
                TableName: process.env.DYNAMO_TABLE_NAME,
                Key: { 'key': decoded.id },
                AttributesToGet: [
                    'card_number',
                    'expiration_month',
                    'expiration_year',
                    'email',
                ]
            }, (err, data) => {
                if (err) {
                    return res.status(404).json('Token not found');
                }
                else {
                    const cardInfo = data.Item;
                    return res.json(cardInfo);
                }
            });
        }
    });
};
exports.validateToken = validateToken;
