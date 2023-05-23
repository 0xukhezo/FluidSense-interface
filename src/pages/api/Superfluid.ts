import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const API_URL =
  "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic";

export const clientSuperfluid = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const Superfluid = (queryBody: string) => gql(queryBody);
