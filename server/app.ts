import express from 'express';
import http from 'http';

import Logging from '../helpers/logger';
import { config } from '../helpers/config';

import { dbConnect } from './db/mongo.db';
import api from './api';

const server = express();

export const StartServer = () => {
    server.use((req, res, next) => {
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });
    server.use('/api', api);

    server.use((_req, res, _next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    // Healthcheck
    // server.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    http.createServer(server).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};

dbConnect(StartServer);
