const jwt = require('jsonwebtoken');
const { User } = require("../model/user.model");
const JWT_SECRET = 'shhhhh';

// Sample user data
// const users = [
//   { id: 1, name: "user1", password: "password1" },
//   { id: 2, name: "user2", password: "password2" },
// ];

// Middleware to extract and verify JWT token
const authMiddleware = async(req, res, next) => {
    const authorizationHeader = req.headers.authorization;
  
    if (authorizationHeader) {
      const token = authorizationHeader.replace('Bearer ', '');
      try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
  
        // Set the authenticated user on the request context
        // req.user = users.find((user) => user.id === userId);
        let user = await User.findOne({ where: { id: userId } });
        console.log('user',user);
        req.user = await User.findOne({ where: { id: userId } });
      } catch (error) {
        // Ignore invalid tokens
      }
    }
  
    next();
  };

  export {authMiddleware};