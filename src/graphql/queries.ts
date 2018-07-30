import gql from 'graphql-tag';

export const GET_USERS = gql`
  query {
    users {
      id
      name
      rank
      icon
      availability
    }
  }
`;

export const GET_LOBBIES = gql `
  query {
    lobbies {
      id
      name
      gamemode {
        name
      }
      maxPlayer
      playerCount
      owner {
        name
      }
    }
  }
`;
