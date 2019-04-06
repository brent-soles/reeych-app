# Reeych: Frontend Desgin Document
#### Author: Brent Soles
##### Date last edited: 04/05/2019

# Data Format

The backend/frontend will be using data in a JSON format, with the API being driven by GraphQL.

For the design of the frontend/backend GraphQL queries, the document linked here[https://blog.apollographql.com/designing-graphql-mutations-e09de826ed97] will provide some insights into
some of the decisions made about sending/receiving data.

# Data Store (Sans-Redux)

## Motivation

The reason Redux will not directly be implemeneted, is React Hooks, with the useReducer and useContext API's offer a more flexible option for writing global state that is composable.


## Top level reducer

The top level reducer will be a compositino of application specific reducers. From the index file, there will be a few options exported. The `default export` will be the object with the aggregation of reducers, and objects for each specified reducer will be exported along side the main reducer.
