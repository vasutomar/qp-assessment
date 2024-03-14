import { getVariable } from "../config/getVariables";

var jwt = require('jsonwebtoken');
export function getJWTToken(data: any) {
    const salt = getVariable("SALT");
    var token = jwt.sign(data, salt, { algorithm: 'HS256' });
    return token;
}

export async function verifyToken(token: string): Promise<boolean> {
    const salt = getVariable("SALT");
    await jwt.verify(token, salt, function(err: any, decoded: any) {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
    return false;
}