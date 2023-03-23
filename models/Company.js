import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    address: {
      type: String,
      trim: true,
      required: true
    },
    NIT: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    phone: {
      type: Number,
      trim: true,
      required: true
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model('Company', companySchema);
export default Company;
