import { Client, Pool, QueryResultRow } from 'pg'

const globalPg = new Pool({
  connectionString: process.env.NEON_PG_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
// Creates a global connection pool
export const pg = globalPg

// if (process.env.NODE_ENV !== 'production') globalForPg.pg = pg


// export const query = <Result extends QueryResultRow>(
//   text: string,
//   params: any[] = []
// ) => {
//   return pool.query<Result>(text, params)
// }