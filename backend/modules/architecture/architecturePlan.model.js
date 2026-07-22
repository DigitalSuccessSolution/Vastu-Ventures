import mongoose from "mongoose";

const architecturePlanSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Plan title is required"], 
      trim: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "ArchitectureCategory"
    },
    categoryName: { 
      type: String, 
      required: true 
    },
    categorySlug: { 
      type: String, 
      required: true 
    },
    buyPrice: { 
      type: Number, 
      required: [true, "Buy price is required"], 
      default: 0 
    },
    consultPrice: { 
      type: Number, 
      required: [true, "Consultation price is required"], 
      default: 0 
    },
    desc: { 
      type: String, 
      default: "" 
    },
    image: { 
      type: String, 
      default: "" 
    },
    pdfUrl: { 
      type: String, 
      default: "" 
    },
    pdfFileName: { 
      type: String, 
      default: "" 
    },
    attachments: [
      {
        name: { type: String, required: true },
        fileUrl: { type: String, default: "" },
        fileType: { type: String, default: "document" }
      }
    ],
    deliverables: { 
      type: [String], 
      default: [] 
    },
    status: { 
      type: String, 
      enum: ["Active", "Inactive"], 
      default: "Active" 
    },
    totalSales: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }
);

const ArchitecturePlan = mongoose.model("ArchitecturePlan", architecturePlanSchema);
export default ArchitecturePlan;
