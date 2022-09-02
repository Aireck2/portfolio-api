import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Contact from '../../api/models/Contact';

const createContact = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, description } = req.body;

    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        description,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return contact
        .save()
        .then((contact) => res.status(201).json({ contact }))
        .catch((error) => res.status(500).json({ error }));
};

const getContact = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Contact.findById(authorId)
        .then((contact) => (contact ? res.status(200).json({ contact }) : res.status(404).json({ message: 'not found' })))
        .catch((err) => res.status(500).json({ err }));
};

const getContacts = (req: Request, res: Response, next: NextFunction) => {
    return Contact.find()
        .then((contacts) => res.status(200).json({ contacts }))
        .catch((error) => res.status(500).json({ error }));
};

export default { createContact, getContacts, getContact };
