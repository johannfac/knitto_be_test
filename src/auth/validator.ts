import { header } from "express-validator";

function validateAuthToken() {
  return [
    header("authorization")
      .exists().withMessage("Authorization header is required")
      .bail()
      .matches(/^Token\s+\S+$/).withMessage('Authorization header must be in format "Token <token>"')
  ];
}

function validateBasicAuth() {
  return [
    header("authorization")
      .exists().withMessage("Authorization header is required")
      .bail()
      .matches(/^Basic\s+\S+$/).withMessage('Authorization header must be in format "Basin <token>"')
      .bail()
      .custom((value) => {
        const base64Credentials = value.split(" ")[1];
        let decoded: string;

        try {
          decoded = Buffer.from(base64Credentials, "base64").toString("utf-8");
        } catch {
          throw new Error("Invalid base64 encoding in authorization token");
        }

        if (!decoded.includes(':')) {
          throw new Error('Decoded credentials must be in "username:password" format');
        }

        const [username, password] = decoded.split(":");
        if (!username || !password) {
          throw new Error("Both username and password must be provided");
        }

        return true;
      })
  ];
}

export { validateAuthToken, validateBasicAuth };