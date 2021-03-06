import React, { useReducer } from 'react';
import AppRouter from "./AppRouter";
import logo from './logo.svg';
import './App.css';
import {fetch} from 'whatwg-fetch'
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { UserContext, AuthContext } from './context'
import Authentication from './screens/Authentication'
import 'typeface-roboto';
import { StylesProvider } from '@material-ui/styles';

const client = new ApolloClient(
  {
    link: createUploadLink({
      uri: 'http://127.0.0.1:4000/graphql',
      fetch,
      fetchOptions: {
        credentials: "include"
      }
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }
  })


export default function App() {
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState("");
  // debugger;

  const [user, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'CHECK_TOKEN':
        case 'LOGIN':
          return action.user
        case 'LOGOUT':
          window.location.href = "/"
          return {}
      }
    }
  );
  // const notify = (type, message) => {
  //   setAlertMessage(message);
  //   setAlertType(type);
  // };

  // const handleCloseAlert = () => {
  //   setAlertMessage("");
  // };


  return (
    <StylesProvider injectFirst>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={dispatch}>
          <UserContext.Provider value={user}>
            <AppRouter />
          </UserContext.Provider>
        </AuthContext.Provider>

      </ApolloProvider>
    </StylesProvider>

  );
}