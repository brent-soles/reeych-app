// import ApolloClient from 'apollo-boost'; // apollo-client broken
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const InitClient = ({ endpoint }) => {
    return new ApolloClient({
        link: createHttpLink({uri: endpoint}),
        cache: new InMemoryCache()
    })
}

export default InitClient;