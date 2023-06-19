const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");
const JWT_SECRET = "shhhhh";

// Sample user data
// const users = [
//   { id: 1, name: "user1", password: "password1" },
//   { id: 2, name: "user2", password: "password2" },
// ];

// Resolver functions
const root = {
  me: (args, context) => {
    // Ensure the user is authenticated
    if (!context.user) {
      throw new Error("Authentication required");
    }

    return context.user;
  },

  login: async ({ email, password }) => {
    // Find the user with the provided username and password
    // const user = users.find(
    //   (user) => user.name === name && user.password === password
    // );
    const user = await User.findOne({ where: { email: email, password: password} });

    if (!user) {
      throw new Error("Invalid user email or password");
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return token;
  },
};

export { root };
