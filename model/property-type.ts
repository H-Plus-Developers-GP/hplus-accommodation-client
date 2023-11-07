import mongoose from "mongoose";

export interface PropertyTypeInput {
    name: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface PropertyTypeDocument
    extends PropertyTypeInput,
    mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const propertyTypeSchema = new mongoose.Schema(
    {
        name: {
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

const PropertyTypeModel = mongoose.models.PropertyType || mongoose.model<PropertyTypeDocument>(
    "PropertyType",
    propertyTypeSchema
);

export default PropertyTypeModel;
