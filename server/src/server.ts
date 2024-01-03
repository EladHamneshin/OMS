import express from 'express';
import cors from "cors";
import morgan from "morgan";

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from 'graphql-ws/lib/use/ws';

import http from 'http';
import { config } from 'dotenv';

import { typeDefs } from "./schemas gql/schema.js";
import { resolvers } from './schemas gql/resolves.js';

import { connectToPg } from './configs/connectToPg.js';
import connectToDatabase from './configs/connectToMongo.js';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import ordersRoutes from './routes/ordersRoutes.js';
import { connectToRedis } from './configs/connectRedis.js';
config()
const app = express();

const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors({}));
app.use(morgan('dev'));

const port = process.env.EXPRESSPORT

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
});
const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
   schema,

    formatError: (formattedError, error) => {
        if (
            formattedError.extensions?.code ===
            ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
        ) {
            return {
                ...formattedError,
                message: "Your query doesn't match the schema. Try double-checking it!",
            };
        }
        return formattedError;
    },

    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ] 
});

server.start().then(async () => {
    await connectToPg();    
    await connectToDatabase();
    await connectToRedis();
    app.use("/orders", ordersRoutes)
    app.use(
        '/',
        // cors(),
        expressMiddleware(server)
    );
    httpServer.listen({ port });
    console.log(`🚀 Server ready at: ${port}`);
});


