import gql from 'graphql-tag';

export const CONNECT = gql`
  mutation connect($username: String!, $iconId: Int!) {
    connect(username: $username, iconId: $iconId)
  }
`;
