import { Request, Response } from "express";

import { db } from "../../db/db";

/*
curl -X POST http://localhost:3000/transaction
 */

function transaction() {
  db.tx(async t => {
    await t.none(
      'INSERT INTO product(product_name, stock, price) VALUES($1, $2, $3)',
      ['Product 11', 200, 50000.0000]
    );

    await t.none('UPDATE product SET stock = 100 WHERE id = $1', [5]);

    await t.none('DELETE FROM product WHERE product_name = $1', ['Product 11']);
  })
  .catch(error => {
    console.error('Transaction rolled back:', error);
  });
}

function transactionQuery(req: Request, res: Response) {
  transaction();
  res.status(200).json({ message: "Success" })
}

export { transactionQuery };