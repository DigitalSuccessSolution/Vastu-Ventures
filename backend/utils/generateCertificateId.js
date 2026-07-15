import crypto from "crypto";

/**
 * Generate a unique verifiable certificate ID.
 * Format: VV-CERT-XXXXXX (6 alphanumeric uppercase chars)
 */
const generateCertificateId = () => {
  const random = crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
  return `VV-CERT-${random}`;
};

export default generateCertificateId;
