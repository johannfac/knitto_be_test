import { Request, Response } from "express";

import { validationResult } from "express-validator";

import bcrypt from 'bcrypt';

import { db } from "../../db/db";

/*
curl -X POST \
  -u admin:password \
  http://localhost:3000/authenticate/basic
 */

async function authenticate(username: string, password: string) {
  const query = "SELECT password FROM users WHERE username = ${username}";
  const user = await db.oneOrNone(query, { username, password });

  if (!user) {
    return false;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}

async function authenticateBasic(req: Request, res: Response) {
  const error = validationResult(req);
    
  if (!error.isEmpty()) {
    res.status(400).json({ errors: error.array() });
  }

  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Basic ")) {
    const base64Credentials = authHeader.split(" ")[1];
    const decodedCredentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = decodedCredentials.split(":");
    
    if (await authenticate(username, password)) {
      res.status(200).json({ message: "Authenticated" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(403).json({ error: "No credentials sent!" });
  }
}

export { authenticateBasic };