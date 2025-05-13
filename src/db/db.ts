import pgp from 'pg-promise';

import 'dotenv/config';

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const pg = pgp();
const db = pg(`postgres://${db_username}:${db_password}@${db_host}:${db_port}/${db_name}`);

export { db };