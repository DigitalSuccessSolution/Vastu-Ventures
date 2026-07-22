import mongoose from "mongoose";

const architectureCategorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Category name is required"], 
      trim: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    description: { 
      type: String, 
      default: "" 
    },
    icon: { 
      type: String, 
      default: "Home" 
    },
    status: { 
      type: String, 
      enum: ["Active", "Inactive"], 
      default: "Active" 
    }
  },
  { timestamps: true }
);

const ArchitectureCategory = mongoose.model("ArchitectureCategory", architectureCategorySchema);
export default ArchitectureCategory;
