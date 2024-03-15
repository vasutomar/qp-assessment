import {
    checkHealth,
    addItem,
    removeItem,
    checkoutCart
} from "../services/cart-service";
import { getUserId } from "../utils/authentication-utils";
import { handleServerError, prepareServerResponse } from "../utils/common-utils";

export async function health(req: any, res: any) {
    const serverHealth = checkHealth();
    res.send({
        "health": serverHealth
    });
}

export async function add(req: any, res: any) {
    try {
        const body = req.body;
        const token = req.header('Authorization');
        const userId = await getUserId(token);
        if (!userId) {
            res.send(prepareServerResponse(404, "User not found", null));
        } else {
            const addVerdict = await addItem(body, userId);
            if (addVerdict) {
                res.send(prepareServerResponse(200, "Item added!", null));
            } else {
                res.send(prepareServerResponse(404, "Item not found or cannot add to cart", null));
            }
        }
    } catch (err) {
        handleServerError(err, res);
    }
}

export async function remove(req: any, res: any) {
    try {

    } catch (err) {
        handleServerError(err, res);
    }
}

export async function checkout(req: any, res: any) {
    try {

    } catch (err) {
        handleServerError(err, res);
    }
}

