import HttpStatusCode from "@/enums/HttpStatusCodes";

export enum ErrorCode {
    DEFAULT = HttpStatusCode.InternalServerError,
    NOT_FOUND = HttpStatusCode.NotFound,
}