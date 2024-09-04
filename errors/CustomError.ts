import {ErrorCode} from "@/enums/ErrorCode";

export class CustomError extends Error {
    message: string;
    errorCode: ErrorCode;

    constructor(message: string, errorCode: ErrorCode) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
    }
}