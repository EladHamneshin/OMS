import express from 'express';
import cors from "cors";
import morgan from "morgan";

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import http from 'http';
import { config } from 'dotenv';

import { typeDefs } from "./schemas gql/schema.js";
import { resolvers } from './schemas gql/resolves.js';

import { connectToPg } from './configs/connectDbAdmin.js';
import connectToDatabase from './configs/connectToMongogoDB.js';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import ordersRoutes from './routes/ordersRoutes.js';
config()
const app = express();

const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors({}));
app.use(morgan('dev'));
const port = process.env.EXPRESSPORT
const server = new ApolloServer({
    typeDefs,
    resolvers,

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
        ApolloServerPluginDrainHttpServer({ httpServer })
    ],
});

server.start().then(async () => {

    await connectToPg();    
    await connectToDatabase();
    app.use("/orders", ordersRoutes)
    app.use(
        '/',
        // cors(),
        expressMiddleware(server)
    );

    httpServer.listen({ port });
    console.log(`🚀 Server ready at: ${port}`);
});


