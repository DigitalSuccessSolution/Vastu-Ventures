import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    gstAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    pdfUrl: { type: String, required: true },
    pdfPublicId: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);



const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
