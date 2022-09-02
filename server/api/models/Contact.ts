import mongoose, { Document, Schema } from 'mongoose';

export interface IContact {
    name: string;
    email: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IContactModel extends IContact, Document {}

const ContactSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        description: { type: String, required: true },
        createdAt: { type: Date, required: true },
        updatedAt: { type: Date, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IContactModel>('Contact', ContactSchema);
