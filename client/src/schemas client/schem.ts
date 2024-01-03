import { gql } from "@apollo/client";

export const USER_SUBSCRIPTION = gql`
subscription MessagePubSub {
  messagePubSub {
    message
  }
}
`;
