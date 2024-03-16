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
            const addedItems = await addItem(body, userId);
            if (addedItems.length) {
                res.send(prepareServerResponse(200, "Item added!", addedItems));
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
        const body = req.body;
        const token = req.header('Authorization');
        const userId = await getUserId(token);
        if (!userId) {
            res.send(prepareServerResponse(404, "User not found", null));
        } else {
            const removeVerdict = await removeItem(body, userId);
            if (removeVerdict) {
                res.send(prepareServerResponse(200, "Item removed!", null));
            } else {
                res.send(prepareServerResponse(404, "Item not found or cannot remove from cart", null));
            }
        }
    } catch (err) {
        handleServerError(err, res);
    }
}

export async function checkout(req: any, res: any) {
    try {
        const token = req.header('Authorization');
        const userId = await getUserId(token);
        if (!userId) {
            res.send(prepareServerResponse(404, "User not found", null));
        } else {
            const userCheckout = await checkoutCart(userId);
            if (userCheckout) {
                res.send(prepareServerResponse(200, "Checkout complete!", userCheckout));
            } else {
                res.send(prepareServerResponse(404, "Cannot process checkout", null));
            }
        }
    } catch (err) {
        handleServerError(err, res);
    }
}

