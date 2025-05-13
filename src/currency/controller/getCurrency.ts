import { Request, Response } from "express";

/*
curl http://localhost:3000/currency/indonesia
 */

function getCurrency(req: Request, res: Response) {
  const { country } = req.params;

  fetch(`https://restcountries.com/v3.1/currency/${country}`)
  .then(data => data.json())
  .then(data => {
    const info = data[0]
    res.status(200).json({ currency: info.currencies });
  })
  .catch(error => {
    res.status(500).json({ message: "Get currency failed:", error });
  });
}

export { getCurrency };