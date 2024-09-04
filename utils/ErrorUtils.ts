import {CustomError} from "@/errors/CustomError";
import type {NextApiResponse} from "next";

export function handleError(error: Error | unknown, res: NextApiResponse) {
    console.error(error);
    if (error instanceof CustomError) {
        return res.status(error.errorCode).json({error: error.message});
    }
    return res.status(500).json({error: "Unhandled error"});
}