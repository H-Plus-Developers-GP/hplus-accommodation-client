import mongoose from "mongoose";

export interface OtherInfoInput {
  label: string;
  createdBy: string;
  updatedBy?: string;
}

export interface OtherInfoDocument extends OtherInfoInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const otherInfoSchema = new mongoose.Schema(
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

const OtherInfoModel = mongoose.models.OtherInfo || mongoose.model<OtherInfoDocument>(
  "OtherInfo",
  otherInfoSchema
);

export default OtherInfoModel;
