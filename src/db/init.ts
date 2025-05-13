import { Request, Response } from "express";

import path from "path";

import { QueryFile } from "pg-promise";

import { db } from "./db";

/*
curl http://localhost:3000/init
 */

function getSQLContent(file: string) {
  return new QueryFile(path.join(__dirname, file), { minify: true });
}

function initDB(req: Request, res: Response) {
  const sql = getSQLContent('../../schema.sql');
  
  db.none(sql)  
  .then(() => {
    console.log('DB initialization success');
    res.status(200).json({ message: 'Success' });
  })
  .catch(error => {
    console.error('Error initializing DB: ', error);
    res.status(500).json({ message: 'Internal server errror' });
  });
}

export { initDB };