import { getVariable } from "./getVariables";

const host = getVariable('DBHOST');
const user = getVariable('DBUSER');
const password = getVariable('DBPASS');
const database = getVariable('DBNAME');

export const dbConfig = {
    host,
    user,
    password,
    database,
};