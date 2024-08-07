import {CustomError} from "@/errors/CustomError";
import {ErrorCode} from "@/enums/ErrorCode";

export class NotFoundError extends CustomError {
    message: string;
    errorCode: ErrorCode;

    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode);
        this.message = message;
        this.errorCode = errorCode;
    }
}