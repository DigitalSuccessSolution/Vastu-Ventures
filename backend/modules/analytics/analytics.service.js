import User from "../users/user.model.js";
import Course from "../courses/course.model.js";
import Payment from "../payments/payment.model.js";
import Consultation from "../consultations/consultation.model.js";

export const getDashboardStats = async () => {
  const totalUsers = await User.countDocuments({ role: "student" });
  const totalCourses = await Course.countDocuments({ status: "published" });

  const revenueResult = await Payment.aggregate([
    { $match: { status: "paid" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total / 100 : 0; // convert paise to INR

  const totalConsultations = await Consultation.countDocuments();

  return {
    totalUsers,
    totalCourses,
    totalRevenue,
    totalConsultations
  };
};

export const getRecentPayments = async (limit = 5) => {
  return Payment.find({ status: "paid" })
    .populate("user", "firstName lastName email")
    .populate("course", "title")
    .populate("consultation")
    .sort({ createdAt: -1 })
    .limit(limit);
};

export const getRecentUsers = async (limit = 5) => {
  return User.find({ role: "student" })
    .select("firstName lastName email createdAt")
    .sort({ createdAt: -1 })
    .limit(limit);
};

export const getPopularCourses = async (limit = 5) => {
  return Course.find({ status: "published" })
    .select("title price enrollmentCount averageRating")
    .sort({ enrollmentCount: -1 })
    .limit(limit);
};

export const getConsultationStats = async () => {
  const pending = await Consultation.countDocuments({ status: "pending" });
  const approved = await Consultation.countDocuments({ status: "approved" });
  const completed = await Consultation.countDocuments({ status: "completed" });
  const rescheduled = await Consultation.countDocuments({ status: "rescheduled" });
  const rejected = await Consultation.countDocuments({ status: "rejected" });

  return {
    pending,
    approved,
    completed,
    rescheduled,
    rejected
  };
};

export const getRevenueTrend = async (startDateStr, endDateStr) => {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const payments = await Payment.aggregate([
    {
      $match: {
        status: "paid",
        paidAt: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
        revenue: { $sum: "$amount" }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Format amount to INR
  return payments.map((p) => ({
    date: p._id,
    revenue: p.revenue / 100
  }));
};
