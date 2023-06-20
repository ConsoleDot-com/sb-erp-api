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
const XLSX = require('xlsx');
const path = require('path');

const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");
const { Login } = require("../model/login.model");
const { UserType } = require("../types/user.type");
const { RoleType } = require("../types/role.type");

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
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

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

        if(args.role === process.env.ADMIN_ROLE){
          throw new Error("Super Admin already exist, please choose other role");
        }

        let user = await Login.findOne({ where: { cnic: args.cnic } });

        if (user) {
          throw new Error("CNIC with different role already exists");
        }

        let role = new Login({
          cnic: args.cnic,
          password: args.password,
          role: args.role.toLowerCase(),
        });
        return role.save();
      },
    },
    superAdmin: {
      type: RoleType,
      resolve: async (parent, args) => {
        try {
          const existingUser = await User.findOne({ cnic: process.env.ADMIN_CNIC });

          if (existingUser) {
            throw new Error("User with the provided CNIC already exists.");
          }

          let role = new Login({
            cnic: process.env.ADMIN_CNIC,
            password: process.env.ADMIN_PASSWORD,
            role: process.env.ADMIN_ROLE,
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
      usersExcel: {
        type: new GraphQLList(UserType),
        resolve: () => {
          const workbook = XLSX.readFile(path.resolve(__dirname, 'data.xlsx'));
          const sheet = workbook.Sheets["Sheet1"];
          const rows = XLSX.utils.sheet_to_json(sheet);

          return rows;
        },
      },
    },
  }),
  mutation: Mutation,
});

export { schema };
