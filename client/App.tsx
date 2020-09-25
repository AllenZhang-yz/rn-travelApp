import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';
import { ApolloLink, Observable, Operation } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import AppNavigator from './src/navigation/AppNavigator';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const httpLink = new HttpLink({
  uri: 'http://192.168.1.2:4000/graphql',
  credentials: 'include',
});

const request = async (operation: Operation) => {
  const token = await AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
};

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    lazy: true,
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: 'http://192.168.1.2:4000/graphql',
  link: ApolloLink.from([requestLink, link]) as any,
});

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };
  return (
    <PaperProvider theme={theme as any}>
      <ApolloProvider client={apolloClient}>
        <View style={styles.container}>
          <AppNavigator toggleTheme={toggleTheme} />
        </View>
      </ApolloProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
