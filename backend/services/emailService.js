import transporter from "../config/nodemailer.js";
import env from "../config/env.js";

/**
 * Send email using Nodemailer.
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML body
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"${env.FROM_NAME}" <${env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Email send failed: ${error.message}`);
    // Don't throw — email failures shouldn't crash the request
    return null;
  }
};

// Template helpers
export const sendWelcomeEmail = (to, name) => {
  const html = `<h2>Welcome to VastuVentures, ${name}!</h2><p>Thank you for joining our platform. Please verify your email to get started.</p>`;
  return sendEmail(to, "Welcome to VastuVentures", html);
};

export const sendOTPEmail = (to, name, otp) => {
  const html = `<h2>Email Verification</h2><p>Hello ${name},</p><p>Your verification OTP is: <strong>${otp}</strong></p><p>This OTP expires in 10 minutes.</p>`;
  return sendEmail(to, "Verify Your Email — VastuVentures", html);
};

export const sendPasswordResetEmail = (to, name, resetUrl) => {
  const html = `<h2>Reset Your Password</h2><p>Hello ${name},</p><p>Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 15 minutes.</p>`;
  return sendEmail(to, "Reset Password — VastuVentures", html);
};

export const sendBookingConfirmationEmail = (to, name, service, date, slot) => {
  const html = `<h2>Booking Confirmed</h2><p>Hello ${name},</p><p>Your consultation for <strong>${service}</strong> on <strong>${date}</strong> at <strong>${slot}</strong> has been received. We will confirm shortly.</p>`;
  return sendEmail(to, "Consultation Booking Received — VastuVentures", html);
};

export const sendBookingStatusEmail = (to, name, status, notes = "") => {
  const html = `<h2>Booking Update</h2><p>Hello ${name},</p><p>Your consultation booking has been <strong>${status}</strong>.</p>${notes ? `<p>Note: ${notes}</p>` : ""}`;
  return sendEmail(to, `Consultation ${status.charAt(0).toUpperCase() + status.slice(1)} — VastuVentures`, html);
};

export const sendPaymentSuccessEmail = (to, name, amount, item) => {
  const html = `<h2>Payment Successful</h2><p>Hello ${name},</p><p>Your payment of ₹${amount} for <strong>${item}</strong> was successful.</p>`;
  return sendEmail(to, "Payment Successful — VastuVentures", html);
};

export const sendCertificateEmail = (to, name, courseName, certificateId) => {
  const html = `<h2>Congratulations, ${name}!</h2><p>You have completed <strong>${courseName}</strong>.</p><p>Certificate ID: <strong>${certificateId}</strong></p><p>Download your certificate from your dashboard.</p>`;
  return sendEmail(to, "Certificate Issued — VastuVentures", html);
};
