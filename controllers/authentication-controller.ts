import { User } from "../models/User";

import {
    checkHealth,
    createUser,
    findUser
} from "../services/authentication-service";
import { handleServerError, prepareServerResponse } from "../utils/common-utils";

export async function health(req: any, res: any) {
    const serverHealth = checkHealth();
    res.send({
        "health": serverHealth
    });
}

export async function signup(req: any, res: any) {
    try {
        const body = req.body;
        const createdUser: User = createUser(body);
        res.send(prepareServerResponse(201, "User created", createdUser.userId));
    } catch (err) {
        handleServerError(err, res);
    }
}

export async function signin(req: any, res: any) {
    try {
        const body = req.body;
        const token: Promise<string | null> = await findUser(body);
        if (token) {
            res.send(prepareServerResponse(200, "User logged in!", token));
        } else {
            res.send(prepareServerResponse(204, "Invalid email or password", token));
        }
    } catch (err) {
        handleServerError(err, res);
    }
}

