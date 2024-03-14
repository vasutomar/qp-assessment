import { checkHealth } from "../services/authentication-service";

export async function health(req: any, res: any) {
    const serverHealth = checkHealth();
    res.send({
        "health": serverHealth
    });
}