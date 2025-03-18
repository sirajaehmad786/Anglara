// import { Request, Response, NextFunction } from "express";
// import  body, {validationResult} from "express-validator";

// // Middleware to validate request
// export const validate = (validations: any[]) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         for (let validation of validations) {
//             const result = await validation.run(req);
//             if (!result.isEmpty()) break;
//         }

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 status: false,
//                 message: errors.array()[0].msg,
//             });
//         }
//         next();
//     };
// };

// // Validation rules for title and content
// export const postValidation = [
//     body("title")
//         .notEmpty().withMessage("Title is required")
//         .isString().withMessage("Title must be a string")
//         .matches(/^[A-Za-z\s]+$/).withMessage("Title must contain only letters"),

//     body("content")
//         .notEmpty().withMessage("Content is required")
//         .isString().withMessage("Content must be a string")
//         .isLength({ min: 10 }).withMessage("Content must be at least 10 characters long"),
// ];
