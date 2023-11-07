import mongoose from "mongoose";

export interface UserInput {
    username: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    customPermission?: Array<string>;
    contactInfo?: {
        telegram?: string;
        viber?: string;
    };
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const contactInfoSchema = new mongoose.Schema({
    telegram: {
        type: String,
        default: null
    },
    viber: {
        type: String,
        default: null
    },
}, { _id: false });

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Role",
        },
        customPermission: [
            { type: mongoose.Types.ObjectId, ref: "Permission", default: [] },
        ],
        contactInfo: {
            type: contactInfoSchema,
            required: false,
            default: null,
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
