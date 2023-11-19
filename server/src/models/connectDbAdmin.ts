import pkg from "pg"

const { Client } = pkg
const config = {
    user: "postgres",
    database: "OMS",
    host: "localhost",
    password: "0528302qw",
    port: 5432,
};

const client = new Client(config);
client.connect();

export default client;




