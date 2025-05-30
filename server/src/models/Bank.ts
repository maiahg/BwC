import mongoose from "mongoose";

const BankSchema = new mongoose.Schema({
  accountId: {
    type: String,
    required: true,
  },
  bankId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  fundingSourceUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sharableId: {
    type: String,
    required: true,
  },
});

const Bank = mongoose.model("Bank", BankSchema);
export default Bank;
