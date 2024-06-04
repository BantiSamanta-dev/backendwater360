import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Define the schema for the Tender model
const tenderSchema = new Schema({
  id: { type: String, required: true },
  entryDate: { type: Date, required: true },
  bidStartDate: { type: Date, required: true },
  closingDate: { type: Date, required: true },
  tenderId: { type: String, required: true },
  tenderRefNo: { type: String, required: true },
  title: { type: String, required: true },
  organisationChain: { type: String, required: true },
  emdAmount: { type: Number, required: true },
  tenderValue: { type: Number, required: true },
  typeOfBid: { type: String, required: true },
  scopeOfWork: { type: String, required: true },
  validity: { type: Number, required: true },
  tenderPlatform: { type: String, required: true },
  state: { type: String, required: true },
  status: { type: String, required: true },
  remark: { type: String, required: true }
});

// Create the Tender model using the schema
const Tender = mongoose.model('Tender', tenderSchema);

 export default Tender;
