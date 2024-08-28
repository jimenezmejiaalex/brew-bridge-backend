import HttpStatusCode from "@/enums/HttpStatusCodes";

export enum ErrorCode {
    DEFAULT = HttpStatusCode.InternalServerError,
    BAD_REQUEST = HttpStatusCode.BadRequest,
    NOT_FOUND = HttpStatusCode.NotFound,
}