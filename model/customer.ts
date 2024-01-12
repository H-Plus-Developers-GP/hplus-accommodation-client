import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface CustomerInput {
  username: string;
  password: string;
  phone: string;
  telegram: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
  };
}

export interface CustomerDocument extends CustomerInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const telegramSchema = new mongoose.Schema({
  id: Number,
  is_bot: Boolean,
  first_name: String,
  last_name: String,
  username: String,
  language_code: String,
}, { _id: false });

const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    telegram: {
      type: telegramSchema,
      required: false,
      default: null,
    }
  },
  { timestamps: true }
);

customerSchema.pre("save", async function (next) {
  let user = this as CustomerDocument;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

customerSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const user = this as CustomerDocument;
  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e: any) => false);
};

const CustomerModel = mongoose.models.Customer || mongoose.model<CustomerDocument>("Customer", customerSchema);

export default CustomerModel;
