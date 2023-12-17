import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserContextProvider from './userContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:4500/',
    cache: new InMemoryCache(),
  });
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
  
