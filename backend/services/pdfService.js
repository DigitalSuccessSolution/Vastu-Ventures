/**
 * PDF generation service placeholder.
 * In production, use a library like pdfkit or puppeteer for actual PDF generation.
 * For now, returns a placeholder buffer.
 */

/**
 * Generate a certificate PDF buffer.
 * @param {Object} data - { studentName, courseName, certificateId, issuedAt }
 * @returns {Buffer}
 */
export const generateCertificatePDF = async (data) => {
  // Placeholder: In production, use pdfkit/puppeteer to generate real PDF
  const content = `
    CERTIFICATE OF COMPLETION
    ========================
    This certifies that ${data.studentName}
    has successfully completed the course:
    "${data.courseName}"
    
    Certificate ID: ${data.certificateId}
    Issued On: ${data.issuedAt}
    
    VastuVentures Academy
  `;
  return Buffer.from(content, "utf-8");
};

/**
 * Generate an invoice PDF buffer.
 * @param {Object} data - { invoiceNumber, studentName, item, amount, gstAmount, totalAmount, date }
 * @returns {Buffer}
 */
export const generateInvoicePDF = async (data) => {
  // Placeholder: In production, use pdfkit/puppeteer to generate real PDF
  const content = `
    INVOICE
    =======
    Invoice #: ${data.invoiceNumber}
    Date: ${data.date}
    
    Bill To: ${data.studentName}
    
    Item: ${data.item}
    Amount: ₹${data.amount}
    GST: ₹${data.gstAmount}
    Total: ₹${data.totalAmount}
    
    VastuVentures
  `;
  return Buffer.from(content, "utf-8");
};
