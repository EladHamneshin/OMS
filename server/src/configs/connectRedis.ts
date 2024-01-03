import chalk from 'chalk';
import { createClient } from "redis";

export const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});
console.log('a',process.env.REDIS_HOST);
console.log('an',process.env.REDIS_PORT);

// Connect to Redis
export const connectToRedis = async () => {
    await client.connect()
        .then(() => {
            console.log(chalk.magentaBright("Connected successfully to Redis client!!!"));
        })
        .catch((error) => {
            console.error(chalk.redBright(`Error connecting to Redis: ${error}`));
        });
}
