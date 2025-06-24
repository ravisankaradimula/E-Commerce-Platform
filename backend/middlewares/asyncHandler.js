const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // ✅ pass the error to Express
};

export default asyncHandler;
