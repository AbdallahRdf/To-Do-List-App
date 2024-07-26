import { validationResult } from 'express-validator';

export const handleLoginValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
    next();
}