import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  cognitoId: {
    type: String,
    required: true,
    unique: true,
  },
  given_name: {
    type: String,
    required: false,
  },
  family_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  ssn: {
    type: String,
    required: false,
  },
  dwollaCustomerUrl: {
    type: String,
    required: false,
  },
  dwollaCustomerId: {
    type: String,
    required: false,
  },
  accountStatus: {
    type: String,
    required: true,
    enum: ["pending", "active", "inactive"],
    default: "pending",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
