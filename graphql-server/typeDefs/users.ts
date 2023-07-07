import { CreateUsernameResponse } from "../utils/types";
import { gql } from "graphql-tag";

const userTypeDefs = gql`
  type Query {
    searchUsers(username: String!): [User]
  }
  type Mutation {
    createUsername(username: String!): CreateUsernameResponse!
  }
  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
  type User {
    id: String
    username: String
  }
`;
export default userTypeDefs;
