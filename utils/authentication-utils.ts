import { getVariable } from "../config/getVariables";
import { getUser } from "../services/authentication-service";

var jwt = require('jsonwebtoken');
export function getJWTToken(data: any) {
    const salt = getVariable("SALT");
    var token = jwt.sign(data, salt, { algorithm: 'HS256' });
    return token;
}

export async function verifyToken(token: string): Promise<boolean> {
    try {
        const salt = getVariable("SALT");
        let isValid = true;
        await jwt.verify(token, salt, function(err: any, decoded: any) {
            if (err) {
                isValid = false;
            }
        });
        return isValid;
    } catch(err) {
        throw err;
    }
}

export async function getRole(token: string): Promise<string> {
    try {
        const salt = getVariable("SALT");
        let role = '';
        await jwt.verify(token, salt, async function(err: any, decoded: any) {
            if (!err) {
                const userId = decoded.userId;
                const fetchedUser = await getUser(userId);
                if (fetchedUser) {
                    role = fetchedUser.role;
                }
            }
        });
        return role;
    } catch(err) {
        throw err;
    }
}

export async function getUserId(token: string): Promise<string> {
    try {
        const salt = getVariable("SALT");
        let userId = '';
        await jwt.verify(token, salt, async function(err: any, decoded: any) {
            if (!err) {
                userId = decoded.userId;
            }
        });
        return userId;
    } catch(err) {
        throw err;
    }
}