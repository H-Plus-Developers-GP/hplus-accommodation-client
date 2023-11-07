import mongoose from "mongoose";

export interface FunishingTypeInput {
    label: string;
    createdBy: string;
    updatedBy?: string;
}

export interface FunishingTypeDocument
    extends FunishingTypeInput,
    mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const funishingTypeSchema = new mongoose.Schema(
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

const FunishingTypeModel = mongoose.models.FunishingType || mongoose.model<FunishingTypeDocument>(
    "FunishingType",
    funishingTypeSchema
);

export default FunishingTypeModel;
