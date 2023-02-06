import pkg from 'express-validator'
const { body } = pkg;
/**
 * Login Validations
 * */
export const LoginValidation = [

    body("email").not().isEmpty().withMessage('Please enter email address').trim().isEmail().withMessage("Please enter valid email address.").trim(),
    body("password").trim().notEmpty().withMessage('Please enter password.').isLength({ min: 6 }).withMessage("Password must be at least 6 character long.").not().matches(/^$|\s+/).withMessage('White space not allowed')
];