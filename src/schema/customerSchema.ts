const typeDefs = gql`
  type Customer {
    id: Int!
    houseNo: String!
    name: String!
    address: String!
    city: String!
  }

  type Query {
    customers: [Customer!]!
  }

  type Mutation {
    createCustomer(houseNo: String!, name: String!, address: String!, city: String!): Customer!
  }
`;
