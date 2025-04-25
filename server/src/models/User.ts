import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    cognitoId: {
        type: String,
        required: true,
        unique: true,
    },
    given_name: {
        type: String,
        required: true,
    },
    family_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    dwollaCustomerUrl: {
        type: String,
        required: false,
    },
    dwollaCustomerId: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("User", UserSchema);
export default User;