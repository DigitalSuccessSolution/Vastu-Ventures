import ArchitectureCategory from "./architectureCategory.model.js";
import ArchitecturePlan from "./architecturePlan.model.js";
import Payment from "../payments/payment.model.js";
import { verifyAccessToken } from "../../utils/generateToken.js";
import User from "../users/user.model.js";

// ================= PUBLIC CONTROLLERS =================

// 1. Get all active categories with plan count (for Navbar dropdown & public UI)
export const getPublicCategories = async (req, res, next) => {
  try {
    const categories = await ArchitectureCategory.find({ status: "Active" }).sort({ createdAt: 1 });
    
    // Attach plan count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await ArchitecturePlan.countDocuments({ 
          $or: [{ category: cat._id }, { categorySlug: cat.slug }],
          status: "Active" 
        });
        return {
          ...cat.toObject(),
          planCount: count
        };
      })
    );

    res.status(200).json({
      success: true,
      data: categoriesWithCount
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get single category details & active plans by category slug
export const getPublicCategoryPlans = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await ArchitectureCategory.findOne({ slug, status: "Active" });
    const plans = await ArchitecturePlan.find({ 
      $or: [{ categorySlug: slug }, ...(category ? [{ category: category._id }] : [])],
      status: "Active" 
    }).sort({ createdAt: -1 });

    const cleanedPlans = plans.map(p => {
      const planObj = JSON.parse(JSON.stringify(p));
      planObj.pdfUrl = "";
      if (Array.isArray(planObj.attachments)) {
        planObj.attachments = planObj.attachments.map(att => ({
          ...att,
          fileUrl: "" // Hard lock: strip attachment URLs completely
        }));
      }
      return planObj;
    });

    res.status(200).json({
      success: true,
      data: {
        category: category || { name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), slug },
        plans: cleanedPlans
      }
    });
  } catch (error) {
    next(error);
  }
};

// 3. Get single plan details by planSlug
export const getPublicPlanBySlug = async (req, res, next) => {
  try {
    const { planSlug } = req.params;

    const plan = await ArchitecturePlan.findOne({ slug: planSlug, status: "Active" });

    if (!plan) {
      return res.status(404).json({ success: false, message: "Architecture plan not found" });
    }

    const planObj = JSON.parse(JSON.stringify(plan));

    // Optional Check: verify if the current user has purchased the plan
    let hasPurchased = false;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);
        if (decoded && decoded.id) {
          const user = await User.findById(decoded.id);
          if (user) {
            if (user.role === "admin") {
              hasPurchased = true;
            } else {
              const payment = await Payment.findOne({
                user: user._id,
                architecturePlan: plan._id,
                status: "paid"
              });
              if (payment) {
                hasPurchased = true;
              }
            }
          }
        }
      } catch (authErr) {
        console.log("Optional payment verify auth check error:", authErr.message);
      }
    }

    planObj.isUnlocked = hasPurchased;

    // STRICT PROTECTION: Keep cover image visible, but strip all secure downloadable attachments if not purchased
    if (!hasPurchased) {
      planObj.pdfUrl = "";
      if (Array.isArray(planObj.attachments)) {
        planObj.attachments = planObj.attachments.map(att => ({
          ...att,
          fileUrl: "" // Empty URL so it's impossible to inspect or fetch in DevTools
        }));
      }
    }

    res.status(200).json({
      success: true,
      data: planObj
    });
  } catch (error) {
    next(error);
  }
};

// ================= ADMIN CONTROLLERS =================

// 1. Get all categories for Admin
export const getAdminCategories = async (req, res, next) => {
  try {
    const categories = await ArchitectureCategory.find().sort({ createdAt: 1 });

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await ArchitecturePlan.countDocuments({ 
          $or: [{ category: cat._id }, { categorySlug: cat.slug }]
        });
        return {
          ...cat.toObject(),
          id: cat._id.toString(),
          planCount: count
        };
      })
    );

    res.status(200).json({
      success: true,
      data: categoriesWithCount
    });
  } catch (error) {
    next(error);
  }
};

// 2. Create Category (Admin)
export const createCategory = async (req, res, next) => {
  try {
    const { name, icon, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await ArchitectureCategory.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Category with this name already exists" });
    }

    const category = await ArchitectureCategory.create({
      name: name.trim(),
      slug,
      icon: icon || "Home",
      description: description || "",
      status: "Active"
    });

    res.status(201).json({
      success: true,
      data: {
        ...category.toObject(),
        id: category._id.toString(),
        planCount: 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// 3. Delete Category (Admin)
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await ArchitectureCategory.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Check if category has any linked plans
    const linkedPlansCount = await ArchitecturePlan.countDocuments({
      $or: [{ category: category._id }, { categorySlug: category.slug }]
    });

    if (linkedPlansCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category "${category.name}" because it has ${linkedPlansCount} linked architecture plan(s). Delete or reassign the plans first.`
      });
    }

    await ArchitectureCategory.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// 4. Get all plans for Admin
export const getAdminPlans = async (req, res, next) => {
  try {
    const plans = await ArchitecturePlan.find().sort({ createdAt: -1 });

    const formattedPlans = plans.map(p => ({
      ...p.toObject(),
      id: p._id.toString()
    }));

    res.status(200).json({
      success: true,
      data: formattedPlans
    });
  } catch (error) {
    next(error);
  }
};

// 5. Create Plan (Admin)
export const createPlan = async (req, res, next) => {
  try {
    const { title, categoryName, buyPrice, consultPrice, desc, image, pdfUrl, pdfFileName, attachments, deliverables, status } = req.body;
    if (!title || !categoryName) {
      return res.status(400).json({ success: false, message: "Title and Category are required" });
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const categorySlug = categoryName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let catObj = await ArchitectureCategory.findOne({ slug: categorySlug });
    if (!catObj) {
      catObj = await ArchitectureCategory.create({ name: categoryName, slug: categorySlug });
    }

    const plan = await ArchitecturePlan.create({
      title: title.trim(),
      slug,
      category: catObj._id,
      categoryName: categoryName.trim(),
      categorySlug,
      buyPrice: Number(buyPrice) || 0,
      consultPrice: Number(consultPrice) || 0,
      desc: desc || "",
      image: image || "",
      pdfUrl: pdfUrl || "",
      pdfFileName: pdfFileName || "",
      attachments: Array.isArray(attachments) ? attachments : [],
      deliverables: Array.isArray(deliverables) ? deliverables : [],
      status: status || "Active"
    });

    res.status(201).json({
      success: true,
      data: {
        ...plan.toObject(),
        id: plan._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// 6. Update Plan (Admin)
export const updatePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, categoryName, buyPrice, consultPrice, desc, image, pdfUrl, pdfFileName, attachments, deliverables, status } = req.body;

    const plan = await ArchitecturePlan.findById(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }

    if (title) {
      plan.title = title.trim();
      plan.slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }

    if (categoryName) {
      plan.categoryName = categoryName.trim();
      plan.categorySlug = categoryName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      let catObj = await ArchitectureCategory.findOne({ slug: plan.categorySlug });
      if (catObj) plan.category = catObj._id;
    }

    if (buyPrice !== undefined) plan.buyPrice = Number(buyPrice);
    if (consultPrice !== undefined) plan.consultPrice = Number(consultPrice);
    if (desc !== undefined) plan.desc = desc;
    if (image !== undefined) plan.image = image;
    if (pdfUrl !== undefined) plan.pdfUrl = pdfUrl;
    if (pdfFileName !== undefined) plan.pdfFileName = pdfFileName;
    if (attachments !== undefined) plan.attachments = attachments;
    if (deliverables !== undefined) plan.deliverables = deliverables;
    if (status !== undefined) plan.status = status;

    await plan.save();

    res.status(200).json({
      success: true,
      data: {
        ...plan.toObject(),
        id: plan._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// 7. Delete Plan (Admin)
export const deletePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ArchitecturePlan.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// 8. Toggle Plan Status (Admin)
export const togglePlanStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await ArchitecturePlan.findById(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }

    plan.status = plan.status === "Active" ? "Inactive" : "Active";
    await plan.save();

    res.status(200).json({
      success: true,
      data: {
        ...plan.toObject(),
        id: plan._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// 9. Upload File to Cloudinary (Admin)
export const uploadArchitectureFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let resourceType = "image";
    let folder = "vastuventures/architecture/images";

    const mime = req.file.mimetype || "";
    if (mime === "application/pdf" || req.file.originalname.toLowerCase().endsWith(".pdf")) {
      resourceType = "raw";
      folder = "vastuventures/architecture/documents";
    } else if (mime.startsWith("video/")) {
      resourceType = "video";
      folder = "vastuventures/architecture/videos";
    }

    try {
      const { uploadToCloudinary } = await import("../../services/cloudinaryService.js");
      const uploadResult = await uploadToCloudinary(req.file.buffer, folder, resourceType, req.file.originalname);

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully to Cloudinary",
        data: uploadResult
      });
    } catch (cloudErr) {
      console.error("❌ Cloudinary upload failed:", cloudErr.message);
      return res.status(500).json({
        success: false,
        message: `Cloudinary upload failed: ${cloudErr.message}. Please configure CLOUDINARY env variables.`
      });
    }
  } catch (error) {
    next(error);
  }
};
