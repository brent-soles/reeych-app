import ApolloClient from 'apollo-boost'; // apollo-client broken

const InitClient = ({ endpoint, }) => {
    return new ApolloClient({
        uri: endpoint
    })
}

export default InitClient;