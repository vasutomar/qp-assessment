import 'dotenv/config';

export function getVariable(name: string): string {
    const variableFromEnv = process.env[name];
    return variableFromEnv || '';
}