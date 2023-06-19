const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "shhhhh";
const { User } = require("../model/user.model");
const { Login } = require("../model/login.model");

// Types
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    cnic : { type : GraphQLString},
    phone : { type : GraphQLString},
    address : { type : GraphQLString},
  }),
});

const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLID },
    cnic : { type : GraphQLString},
    password : { type : GraphQLString},
    role : { type : GraphQLString},
  }),
});

// Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: { type: GraphQLString },
        cnic: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          gender: args.gender,
          cnic: args.cnic,
          phone: args.phone,
          address: args.address,
        });
        return user.save();
      },
    },
    login: {
      type: GraphQLString,
      args: {
        cnic: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const user = await Login.findOne({
          where: { cnic: args.cnic, password: args.password },
        });

        if (!user) {
          throw new Error("Invalid user cnic or password");
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return token;
      },
    },
    assignRole: {
      type: RoleType,
      args: {
        cnic: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
      },
      resolve: async(parent, args, context)=> {
        // Ensure the user is authenticated
        if (!context.user) {
          throw new Error("Authentication required");
        }

        if(args.role === "super admin"){
          throw new Error("Super Admin already exist, please choose other role");
        }

        let user = await Login.findOne({ where: { cnic: args.cnic } });

        if (user) {
          throw new Error("CNIC with different role already exists");
        }

        let role = new Login({
          cnic: args.cnic,
          password: args.password,
          role: args.role,
        });
        return role.save();
      },
    },
    superAdmin: {
      type: RoleType,
      resolve: async (parent, args) => {
        try {
          const existingUser = await User.findOne({ cnic: "35201" });

          if (existingUser) {
            throw new Error("User with the provided CNIC already exists.");
          }

          let role = new Login({
            cnic: "35201",
            password: "12345",
            role: "super admin",
          });
          return role.save();
        } catch (error) {
          throw new Error("Error adding user: " + error.message);
        }
      },
    },
  },
});

// Root Query
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          return User.findAll();
        },
      },
      me: {
        type: UserType,
        resolve(parent, args, context) {
          // Ensure the user is authenticated
          if (!context.user) {
            throw new Error("Authentication required");
          }

          return context.user;
        },
      },
    },
  }),
  mutation: Mutation,
});

export { schema };
