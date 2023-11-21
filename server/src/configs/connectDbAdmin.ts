import pg, { Pool } from "pg";

const poolConfig = {
    user: "postgres",
    database: "omsproj",
    host: "localhost",
    password: "0528302qw",
    port: 5432,
};

const pool = new Pool(poolConfig);

export default pool;




