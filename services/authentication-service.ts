import { dbConfig } from "../config/mysql-config";
import { User } from "../models/User";
import { v4 as uuidv4 } from "uuid";
import { getJWTToken, verifyToken } from "../utils/authentication-utils";
var mysql = require('mysql2');

export function checkHealth() {
  return "Live";
}

export function createUser(userData: User): User {
  const userId = uuidv4();
  userData.userId = userId;
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  connection.query(`INSERT INTO User (
    userId,
    firstName,
    lastName,
    role,
    cartId,
    email,
    password) VALUES(?, ?, ?, ?, ?, ?, ?)`, [
        userData.userId,
        userData.firstName,
        userData.lastName,
        userData.role,
        null,
        userData.email,
        userData.password,
    ], (error: any, results: any) => {
        if (error) {
            throw Error(error); 
        }
    });
  connection.end();
  return userData;
}

export async function findUser(user: User): Promise<string> {
  try {
    let token = '';
    const email = user.email;
    const password = user.password;
    var connection = mysql.createConnection(dbConfig);
    connection.connect();
    const [rows, fields] = await connection.promise().query(`SELECT * FROM User WHERE email="${email}"`);
    const fetchedUser = rows.length ? rows[0] : {};
    if (fetchedUser.password === password) {
      token = getJWTToken({ user, password });
    }
    connection.end();
    return token;
  } catch(err) {
    throw Error('Error');
  }
}

export async function verifySession(data: any): Promise<boolean> {
  const token = data.token;
  const verdict = await verifyToken(token);
  return verdict;
}