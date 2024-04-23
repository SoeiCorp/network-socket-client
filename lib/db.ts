import { Pool, QueryResultRow } from 'pg'

// Creates a global connection pool
const pool = new Pool({
  connectionString: process.env.NEON_PG_URL,
})

export const query = <Result extends QueryResultRow>(
  text: string,
  params: any[] = []
) => {
  return pool.query<Result>(text, params)
}