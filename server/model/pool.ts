import pg from 'pg';
// ============= Database Operations ============

//define all variables in .env.prod file
export const pool = new pg.Pool({
  host: process.env.PGHOST, //default: localhost
  port: 5432,
  database: process.env.PGDATABASE, // default: dfac
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
  
  //ssl: {
  //  rejectUnauthorized: false,
  //}
});
