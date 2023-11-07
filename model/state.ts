import mongoose, { models } from "mongoose";
import { TownshipDocument } from "./township";

export interface StateInput {
    label: string;
    townships: Array<TownshipDocument["_id"]>;
    createdBy: string;
    updatedBy?: string;
}

export interface StateDocument extends StateInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const stateSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
        },
        townships: [
            { type: mongoose.Types.ObjectId, ref: "Township", required: true },
        ],
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

const StateModel = models.State || mongoose.model<StateDocument>("State", stateSchema);

export default StateModel;
