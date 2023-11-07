import mongoose from "mongoose";
import { StateDocument } from "./state";
import { TownshipDocument } from "./township";
import { PropertyTypeDocument } from "./property-type";
import { FloorTypeDocument } from "./floor-type";
import { WaterSystemDocument } from "./water-system";
import { FunishingTypeDocument } from "./funishing-type";
import { OtherInfoDocument } from "./other-info";
import { OwnershipDocument } from "./ownership";

interface PropertyAddress {
  state: StateDocument["_id"];
  township: TownshipDocument["_id"];
  street?: string;
}

interface PropertyArea {
  width: number;
  length: number;
  area: number;
  acre: number;
}

interface Owner {
  ownername: string;
  othername: string;
  phone: string;
}

interface PropertyInfo {
  type: PropertyTypeDocument["_id"];
  story?: number; // NOT IN CONDO, MINI-CONDO AND APARTMENT
  floor?: number; // NOT IN BUILDING
  area: PropertyArea;
  owner: Owner;
  price: Number;
  pricePerSqFeet: Number;
  bedroom?: number; // NOT IN LAND
  bathroom?: number; // NOT IN LAND
  kitchen?: number; // NOT IN LAND
  aircon?: number; // NOT IN LAND
  floorType?: FloorTypeDocument["_id"]; // NOT IN LAND
  waterSystem?: WaterSystemDocument["_id"]; // NOT IN LAND
  funishingType?: FunishingTypeDocument["_id"]; // NOT IN LAND
  ownership?: OwnershipDocument["_id"]
  roomStructure?: string; // NOT IN LAND
  nearBy?: string;
  electronicSystem?: string; // NOT IN LAND
  parkingAvailibity?: boolean;
}

export interface PropertyInput {
  propertyId: string;
  name: string;
  address: PropertyAddress;
  imgs: Array<string>;
  info: PropertyInfo;
  otherInfo?: Array<OtherInfoDocument["_id"]>;
  mapLoc?: string;
  createdBy: string;
  updatedBy?: string;
}

export interface PropertyDocument extends PropertyInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const propertyAddressSchema = new mongoose.Schema(
  {
    state: {
      type: mongoose.Types.ObjectId,
      ref: "State",
      required: true,
    },
    township: {
      type: mongoose.Types.ObjectId,
      ref: "Township",
      required: true,
    },
    street: String,
  },
  { _id: false }
);

const propertyAreaSchema = new mongoose.Schema(
  {
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    area: { type: Number, required: true },
    acre: { type: Number, required: true }
  },
  { _id: false }
);

const propertyInfoSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Types.ObjectId,
      ref: "PropertyType",
      required: true,
    },
    story: { type: Number, default: 0 },
    floor: { type: Number, default: 0 },
    area: propertyAreaSchema,
    owner: {
      ownername: { type: String, required: true },
      othername: { type: String, required: true },
      phone: { type: String, required: true },
    },
    price: { type: Number, required: true },
    pricePerSqFeet: { type: Number, required: true },
    bedroom: { type: Number, default: 0 },
    bathroom: { type: Number, default: 0 },
    kitchen: { type: Number, default: 0 },
    aircon: { type: Number, default: 0 },
    floorType: {
      type: mongoose.Types.ObjectId,
      ref: "FloorType",
      default: null,
    },
    waterSystem: {
      type: mongoose.Types.ObjectId,
      ref: "WaterSystem",
      default: null,
    },
    funishingType: {
      type: mongoose.Types.ObjectId,
      ref: "FunishingType",
      default: null,
    },
    ownership: {
      type: mongoose.Types.ObjectId,
      ref: "Ownership",
      default: null,
    },
    roomStructure: { type: String, default: null },
    nearBy: { type: String, default: null },
    electronicSystem: { type: String, default: null },
    parkingAvailibity: { type: String, default: false },
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    propertyId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: propertyAddressSchema,
    imgs: [{ type: String, required: true }],
    info: propertyInfoSchema,
    otherInfo: [{ type: mongoose.Types.ObjectId, ref: "OtherInfo" }],
    mapLoc: { type: String, default: null },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const PropertyModel = mongoose.models.Property || mongoose.model<PropertyDocument>(
  "Property",
  propertySchema
);

export default PropertyModel;
