import mongoose from 'mongoose';

import { config } from '../../helpers/config';
import Logging from '../../helpers/logger';

const {
    db: { name, uri }
} = config;

const dbConnect = (startServer: () => void) => {
    mongoose.connect(uri);

    mongoose.connection.on('error', (error) => {
        Logging.error(`[MongoDB] Error to connect: ${name} :: ${JSON.stringify(error)}`);
        mongoose.connection.close().catch(() => Logging.error(`[MongoDB]: Failed to close connection ${name}`));
    });

    mongoose.connection.on('connected', () => {
        Logging.info(`[MongoDB] Established connection: ${name}`);
        startServer();
    });

    mongoose.connection.on('disconnected', () => Logging.error(`[MongoDB] Disconnected: ${name}`));
};

export { dbConnect };
