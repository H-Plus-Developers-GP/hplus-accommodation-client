import mongoose, { models } from "mongoose";

export interface TownshipInput {
    label: string;
    createdBy: string;
    updatedBy?: string;
}

export interface TownshipDocument extends TownshipInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const townshipSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

const TownshipModel = models.Township || mongoose.model<TownshipDocument>(
    "Township",
    townshipSchema
);

export default TownshipModel;
