import mongoose from "mongoose";

export interface OwnershipInput {
    label: string;
    createdBy: string;
    updatedBy?: string;
}

export interface OwnershipDocument extends OwnershipInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const ownershipSchema = new mongoose.Schema(
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

const OwnershipModel = mongoose.models.Ownership || mongoose.model<OwnershipDocument>(
    "Ownership",
    ownershipSchema
);

export default OwnershipModel;
