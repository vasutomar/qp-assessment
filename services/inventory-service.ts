import { dbConfig } from "../config/mysql-config";
import { Item } from "../models/Item";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "./authentication-service";
var mysql = require('mysql2');

export function checkHealth() {
  return "Live";
}

export function add(item: Item): Item {
    const itemId = uuidv4();
    item.itemId = itemId;
    var connection = mysql.createConnection(dbConfig);
    connection.connect();
    connection.query(`INSERT INTO Item (
      itemId,
      name,
      type,
      price,
      count) VALUES(?, ?, ?, ?, ?)`, [
          item.itemId,
          item.name,
          item.type,
          item.price,
          item.count
      ], (error: any, results: any) => {
          if (error) {
              throw Error(error); 
          }
      });
    connection.end();
    return item;
  }