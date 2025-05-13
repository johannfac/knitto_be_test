import { Request, Response } from "express";

import { db } from "../../db/db";

/*
curl http://localhost:3000/report/stock
 */

async function stockReport(req: Request, res: Response) {
  const query = "SELECT product_name, stock FROM product ORDER BY product_name";
  const data = await db.manyOrNone(query);
  res.status(200).json({ data: data });
}

export { stockReport };