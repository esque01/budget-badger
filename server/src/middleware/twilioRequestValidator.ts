import { NextFunction, Request, Response } from "express";
import { validateRequest } from "twilio";
import dotenv from "dotenv";

dotenv.config();

const twilioRequestValidator = (req: Request, res: Response, next: NextFunction) => {
    
    const twilioSignature: string = req.headers['x-twilio-signature'] as string;
    const url = `https://${req.hostname}${req.originalUrl}`;
    const params = req.body;

    if (validateRequest(process.env.TWILIO_AUTH_TOKEN!, twilioSignature, url, params)) {
        next();
    }
    else {
        res.status(403).send("Request not validated as from Twilio");
        return;
    }
};

export default twilioRequestValidator;