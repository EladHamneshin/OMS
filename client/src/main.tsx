import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserContextProvider from './userContext';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';


import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { getMainDefinition } from '@apollo/client/utilities';
const httpLink = new HttpLink({
  uri: 'http://localhost:4500'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4500/graphql',
}));

//ניצור חיבור חכם המאחד את שניהם
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

//אותו נעביר לאובייקט הלקוח לצרוך האזנה לכל סוגי הבקשרות
export const client = new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache(),
});
// export const client = new ApolloClient({
//     uri: 'http://localhost:4500/',
//     cache: new InMemoryCache(),
//   });
  // Supported in React 18+
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
  
