import mongoose from "mongoose";
import { OtherInfoDocument } from "./other-info";
import { PropertyDocument } from "./property";
import { UserDocument } from "./user";

export interface AdvertisementPrice {
    price: number;
    pricePerSqFeet: number;
}

export interface AdvertisementInput {
    adId: string;
    title: string;
    subTitle: string;
    description?: string;
    otherInfo?: Array<OtherInfoDocument["_id"]>;
    adType: string;
    property: PropertyDocument["_id"];
    price: AdvertisementPrice;
    contactInfo: UserDocument["_id"];
    createdBy: UserDocument["_id"];
    updatedBy?: UserDocument["_id"];
}

export interface AdvertisementDocument
    extends AdvertisementInput,
    mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const advertisementPriceSchema = new mongoose.Schema(
    {
        price: { type: Number, required: true },
        pricePerSqFeet: { type: Number, required: true },
    },
    { _id: false }
);

const advertisementSchema = new mongoose.Schema(
    {
        adId: { type: String, required: true },
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        description: { type: String, default: null },
        otherInfo: [{ type: mongoose.Types.ObjectId, ref: "OtherInfo" }],
        adType: { type: String, required: true },
        property: {
            type: mongoose.Types.ObjectId,
            ref: "Property",
            required: true,
        },
        price: advertisementPriceSchema,
        contactInfo: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        updatedBy: { type: mongoose.Types.ObjectId, ref: "User", default: null },
    },
    { timestamps: true }
);

const AdvertisementModel = mongoose.models.Advertisement || mongoose.model<AdvertisementDocument>(
    "Advertisement",
    advertisementSchema
);

export default AdvertisementModel;
