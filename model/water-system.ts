import mongoose from "mongoose";

export interface WaterSystemInput {
    label: string;
    createdBy: string;
    updatedBy?: string;
}

export interface WaterSystemDocument
    extends WaterSystemInput,
    mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const waterSystemSchema = new mongoose.Schema(
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

const WaterSystemModel = mongoose.models.WaterSystem || mongoose.model<WaterSystemDocument>(
    "WaterSystem",
    waterSystemSchema
);

export default WaterSystemModel;
