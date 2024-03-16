import { dbConfig } from "../config/mysql-config";
import { Item } from "../models/Item";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "./authentication-service";
import { Cart } from "../models/Cart";
var mysql = require("mysql2");

export function checkHealth() {
  return "Live";
}

export async function addItem(item: Item, userId: string): Promise<[string]> {
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
  const userItems = getUserItemsInCart(userId);
  connection.end();
  return userItems;
}

export async function removeItem(item: Item, userId: string): Promise<boolean> {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  const [results, fields] = await connection.promise().query(`DELETE from Cart WHERE userId='${userId}' and itemId='${item.itemId}'`);
  connection.end();
  if (!results.affectedRows) return false;
  return true;
}

export async function checkoutCart(userId: string): Promise<boolean> {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  const [fetchedCartItems, fields] = await connection.promise().query(`
    SELECT item.itemId, item.name, cart.count
    FROM item
    INNER JOIN cart ON item.ItemId=cart.itemId
    WHERE userId='${userId}'
  `);
  await connection.promise().query(`DELETE from Cart where userId='${userId}'`);
  await connection.promise().query(`
    UPDATE User
    SET cartId = NULL
    WHERE userId='${userId}'
  `);
  connection.end();
  return fetchedCartItems;
}

async function getUserItemsInCart(userId: string): Promise<[string]> {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  const [results] = await connection.promise().query(`
    SELECT * FROM Cart
    WHERE userId='${userId}'
  `);
  return results.map((result: Cart) => {
    return result.itemId;
  });
}
