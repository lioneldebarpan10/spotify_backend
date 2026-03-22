const { body, validationResult } = require("express-validator");

const registerValidation = [
    body("username").isString().withMessage("Username must be a string").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address").notEmpty().withMessage("Email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").notEmpty().withMessage("Password is required"),
    body("role").optional().isIn(["user", "admin"]).withMessage("Role must be either user or admin"),
];

const loginValidation = [
    body("password").notEmpty().withMessage("Password is required"),
    body().custom((value, { req }) => {
        if (!req.body.username && !req.body.email) {
            throw new Error("Either username or email is required");
        }
        return true;
    })
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    registerValidation,
    loginValidation,
    validate
};