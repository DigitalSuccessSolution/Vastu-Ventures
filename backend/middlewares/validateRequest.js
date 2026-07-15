/**
 * Zod validation middleware factory.
 * Validates req.body, req.query, or req.params against a Zod schema.
 */
const validateRequest = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
    req[source] = result.data;
    next();
  };
};

export default validateRequest;
