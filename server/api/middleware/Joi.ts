import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';

import Logging from '../../../helpers/logger';
import { IContact } from '../../api/models/Contact';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    contact: {
        create: Joi.object<IContact>({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            description: Joi.string().required()
        }),
        update: Joi.object<IContact>({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            description: Joi.string().required()
        })
    }
};
