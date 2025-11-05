import pg from 'pg';
// ============= Database Operations ============

//define all variables in .env.prod file
export const pool = new pg.Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE || 'dfac',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
  
  //ssl: {
  //  rejectUnauthorized: false,
  //}
});
