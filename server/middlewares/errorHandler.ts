import { Request, Response, NextFunction } from 'express';

interface ValidationError {
    message: string;
    properties?: {
        message: string;
    };
    stack?: string;
}

interface CustomError extends Error {
    errors?: Record<string, ValidationError>;
    status?: number;
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): Response => {
    let errorMessages: string[] = [];

    if (error.errors) {
        // Mongoose validation errors
        for (let [key, validationError] of Object.entries(error.errors)) {
            const errorMessage = validationError.properties ? validationError.properties.message : validationError.message;
            errorMessages.push(errorMessage);
            console.error(errorMessage);
            console.log(validationError.stack);
        }
        return res.status(400).json({ errors: errorMessages });
    } else {
        // General errors
        console.error(error.message);
        console.log(error.stack);
        return res.status(error.status || 400).json({ error: { message: error.message } });
    }
};

export default errorHandler;
