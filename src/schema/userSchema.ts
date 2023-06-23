const { buildSchema } = require('graphql');

// // GraphQL schema
// const userSchema = buildSchema(`
//   type User {
//     id: ID!
//     name: String!
//   }

//   type Query {
//     me: User
//   }

//   type Mutation {
//     login(email: String!, password: String!): String
//   }
// `);

// GraphQL schema
const userSchema = buildSchema(`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    cnic: String!
    address: String!
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): String
  }
`);

export { userSchema };