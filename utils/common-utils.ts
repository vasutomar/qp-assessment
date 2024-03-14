import { serverResponse } from "../types/serverResponse";

export function handleServerError(err: any, res: any) {
    const serverResponse: serverResponse = {
        message: "We hit a snag",
        statusCode: 500,
        data: null,
        error: err.message
    };
    res.send(serverResponse);
}

export function prepareServerResponse(statusCode: number, message: string, data: any) {
    const serverResponse: serverResponse = {
        message,
        statusCode,
        data,
        error: null
    };
    return serverResponse;
}