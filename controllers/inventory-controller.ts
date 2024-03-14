import {
    checkHealth,
    add
} from "../services/inventory-service";
import { getRole } from "../utils/authentication-utils";
import { handleServerError, prepareServerResponse } from "../utils/common-utils";

export async function health(req: any, res: any) {
    const serverHealth = checkHealth();
    res.send({
        "health": serverHealth
    });
}

export async function addItem(req: any, res: any) {
    try {
        const body = req.body;
        const token = req.header('Authorization');
        const role = await getRole(token);
        console.log('role', role);
        if (role !== 'admin') {
            res.send(prepareServerResponse(401, "User not authorized", null));
        } else {
            const createdItem = add(body);
            res.send(prepareServerResponse(201, "Item created", createdItem.itemId));
        }
    } catch (err) {
        handleServerError(err, res);
    }
}

export async function viewInventory(req: any, res: any) {
    try {

    } catch (err) {
        handleServerError(err, res);
    }
}

export async function removeItem(req: any, res: any) {
    try {

    } catch (err) {
        handleServerError(err, res);
    }
}

export async function updateItem(req: any, res: any) {
    try {

    } catch (err) {
        handleServerError(err, res);
    }
}


