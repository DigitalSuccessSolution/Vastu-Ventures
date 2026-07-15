export const ERROR_MESSAGES = {
  // Auth
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists",
  EMAIL_NOT_VERIFIED: "Please verify your email before logging in",
  ACCOUNT_BLOCKED: "Your account has been blocked. Contact support.",
  ACCOUNT_LOCKED: "Too many failed login attempts. Account locked temporarily.",
  INVALID_OTP: "Invalid or expired OTP",
  INVALID_RESET_TOKEN: "Invalid or expired reset password token",
  PASSWORD_MISMATCH: "Current password is incorrect",
  REFRESH_TOKEN_MISSING: "Refresh token is missing",
  REFRESH_TOKEN_INVALID: "Invalid or expired refresh token",

  // Authorization
  UNAUTHORIZED: "Authentication required. Please log in.",
  FORBIDDEN: "You do not have permission to perform this action",

  // Generic
  NOT_FOUND: "Resource not found",
  VALIDATION_ERROR: "Validation failed",
  SERVER_ERROR: "Internal server error",
  DUPLICATE_ENTRY: "Duplicate entry found",

  // Consultation
  SLOT_UNAVAILABLE: "The selected time slot is not available",
  CONSULTATION_NOT_FOUND: "Consultation booking not found",
  INVALID_STATUS_TRANSITION: "Invalid status transition",

  // Course
  COURSE_NOT_FOUND: "Course not found",
  ALREADY_ENROLLED: "You are already enrolled in this course",
  NOT_ENROLLED: "You are not enrolled in this course",
  LESSON_NOT_FOUND: "Lesson not found",

  // Payment
  PAYMENT_NOT_FOUND: "Payment record not found",
  PAYMENT_VERIFICATION_FAILED: "Payment verification failed",
  WEBHOOK_SIGNATURE_INVALID: "Invalid webhook signature",

  // Review
  ALREADY_REVIEWED: "You have already reviewed this item",
  REVIEW_NOT_FOUND: "Review not found",

  // Upload
  FILE_TOO_LARGE: "File size exceeds the maximum limit",
  INVALID_FILE_TYPE: "Invalid file type",
  UPLOAD_FAILED: "File upload failed",

  // Certificate
  CERTIFICATE_NOT_FOUND: "Certificate not found",
  COURSE_NOT_COMPLETED: "Course is not yet completed",
};
