import mongoose from "mongoose";

const informationsSchema = new mongoose.Schema(
  {
    supplier_name: String,
    address: String,
    phone_number: String,
  },
  { strict: false }
);

module.exports = mongoose.models.informations || mongoose.model("informations", informationsSchema);
