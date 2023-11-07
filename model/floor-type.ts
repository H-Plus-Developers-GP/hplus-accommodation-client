import mongoose from "mongoose";

export interface FloorTypeInput {
    label: string;
    createdBy: string;
    updatedBy?: string;
}

export interface FloorTypeDocument extends FloorTypeInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const floorTypeSchema = new mongoose.Schema(
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

const FloorTypeModel = mongoose.models.FloorType || mongoose.model<FloorTypeDocument>(
    "FloorType",
    floorTypeSchema
);

export default FloorTypeModel;
