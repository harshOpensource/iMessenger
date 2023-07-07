import { CreateUsernameResponse } from "../utils/types";
import { gql } from "graphql-tag";

const userTypeDefs = gql`
  type Query {
    placeholder: String
  }
  type Mutation {
    createUsername(username: String!): CreateUsernameResponse!
  }
  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;
export default userTypeDefs;
