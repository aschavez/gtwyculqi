import { DynamoDB } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { Card, CardResponse, Token } from "../types";

export const signInToken = (cardData: Card, res: Response) => {
  const tokenId = randomUUID();
  const docClient = new DynamoDB.DocumentClient();
  docClient.put({
    TableName: <string>process.env.DYNAMO_TABLE_NAME,
    Item: {key: tokenId, ...cardData},
  }, (err, _data) => {
    if (err) {
      return res.status(500).json('Error with saving token');
    } else {
      const token = sign({id: tokenId}, <string>process.env.JWT_PRIVATE_KEY, {expiresIn: '1m'});
      return res.json({token: token});
    }
  });
};

export const validateToken = (tokenData: Token, res: Response) => {
  const docClient = new DynamoDB.DocumentClient();
  verify(tokenData.token, <string>process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({"error": err.message});
    } else {
      docClient.get({
        TableName: <string>process.env.DYNAMO_TABLE_NAME,
        Key: {'key': decoded.id},
        AttributesToGet: [
          'card_number',
          'expiration_month',
          'expiration_year',
          'email',
        ]
      }, (err, data) => {
        if (err) {
          return res.status(404).json('Token not found');
        } else {
          const cardInfo: CardResponse = data.Item as CardResponse;
          return res.json(cardInfo);
        }
      });
    }
  });
};