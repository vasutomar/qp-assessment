import { dbConfig } from "../config/mysql-config";
import { Item } from "../models/Item";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "./authentication-service";
var mysql = require("mysql2");

export function checkHealth() {
  return "Live";
}

export async function addItem(item: Item, userId: string): Promise<Item> {
  const user = await getUser(userId);
  let cartId = user.cartId;
  if (!user.cartId) {
    cartId = uuidv4();
  }
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  connection.query(
    `INSERT INTO Cart (
      cartId,
      userId,
      itemId,
      count) VALUES(?, ?, ?, ?)`,
    [cartId, userId, item.itemId, item.count],
    (error: any, results: any) => {
      if (error) {
        throw Error(error);
      }
    }
  );
  const [results, fields] = await connection.promise().query(`
    UPDATE User 
    SET cartId='${cartId}'
    WHERE userId='${userId}'`
  );
  connection.end();
  return item;
}

export async function removeItem(): Promise<[Item]> {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  const [results, fields] = await connection.promise().query(`SELECT * from Item`);
  connection.end();
  return results;
}

export async function checkoutCart(itemId: string): Promise<boolean> {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  const [results, fields] = await connection.promise().query(`DELETE from Item where itemId='${itemId}'`);
  connection.end();
  if (!results.affectedRows) return false;
  return true;
}

export async function updateCount(itemId: string, count: number): Promise<boolean> {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  const [results, fields] = await connection.promise().query(`
    UPDATE Item 
    SET count=${count}
    WHERE itemId='${itemId}'`
  );
  connection.end();
  if (!results.affectedRows) return false;
  return true;
}