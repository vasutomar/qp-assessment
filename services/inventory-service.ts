import { dbConfig } from "../config/mysql-config";
import { Item } from "../models/Item";
import { v4 as uuidv4 } from "uuid";
var mysql = require("mysql2");

export function checkHealth() {
  return "Live";
}

export function add(item: Item): Item {
  const itemId = uuidv4();
  item.itemId = itemId;
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  connection.query(
    `INSERT INTO Item (
      itemId,
      name,
      type,
      price,
      count) VALUES(?, ?, ?, ?, ?)`,
    [item.itemId, item.name, item.type, item.price, item.count],
    (error: any, results: any) => {
      if (error) {
        throw Error(error);
      }
    }
  );
  connection.end();
  return item;
}

export async function getAll(): Promise<[Item]> {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  const [results, fields] = await connection.promise().query(`SELECT * from Item`);
  connection.end();
  return results;
}

export async function remove(itemId: string): Promise<boolean> {
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

export async function update(item: Item): Promise<boolean> {
  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  const [fetchResults] = await connection.promise().query(`
    SELECT * from Item 
    WHERE itemId='${item.itemId}'`
  );
  if (!fetchResults.length) {
    return false;
  }
  let fetchedItem = fetchResults[0];
  Object.keys(item).forEach((key) => {
    fetchedItem[key as keyof Item] = item[key as keyof Item];
  });
  const [updateResults] = await connection.promise().query(`
    UPDATE Item
    SET itemId='${fetchedItem.itemId}',
    name='${fetchedItem.name}',
    type='${fetchedItem.type}',
    price=${fetchedItem.price},
    count=${fetchedItem.count}
  `);
  connection.end();
  if (!updateResults.affectedRows) return false;
  return true;
}