import gql from 'graphql-tag';


/**
 * Input:
 *  spaceId: ID
 *  requester: User ID to be passed to backend
 */
export const GET_SPACE = gql`
  input GetSpaceInput {
    spaceId: ID!
    requester: ID!
  }

  query GetSpace($input: GetSpaceInput!) {
    getSpace(input: $input) {
      id
      name
      org
    }
  }

`