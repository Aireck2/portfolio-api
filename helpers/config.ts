import dotenv from 'dotenv';

dotenv.config();

export const config = {
    db: {
        uri: process.env.DB_URI || '',
        name: process.env.DB_NAME || ''
    },
    server: {
        port: process.env.SERVER_PORT || 1337
    }
};
