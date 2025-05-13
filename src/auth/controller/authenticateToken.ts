import { Request, Response } from "express";

import { validationResult } from "express-validator";

import { db } from "../../db/db";

/*
curl -X POST \
  -H 'Authorization: Token userToken121481' \
  http://localhost:3000/authenticate/token
*/

async function authenticate(token: string) {
  const query = "SELECT * FROM users WHERE token = ${token}";
  return db.oneOrNone(query, { token });
}

async function authenticateToken(req: Request, res: Response) {
  const error = validationResult(req);
  
  if (!error.isEmpty()) {
    res.status(400).json({ errors: error.array() });
  }

  const authHeader = req.headers["authorization"];
  
  if (authHeader && authHeader.startsWith("Token ")) {
    const token = authHeader.split(' ')[1];

    if (await authenticate(token) !== null) {
      res.status(200).json({ message: "Authenticated" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(403).json({ error: "No credentials sent!" });
  }
}

export { authenticateToken };