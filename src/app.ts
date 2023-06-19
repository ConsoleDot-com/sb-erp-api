const express = require("express");
const { sqlConnect } = require("./helper/db-connect");
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const {router} = require('./routes/auth.routes');
const { authMiddleware } = require("./middleware/auth.middleware");
const { root } = require("./controller/auth.resolver");
// const { schema } = require("./schema/schema");
const { schema } = require("./schema/schema");
// const { userSchema } = require("./schema/userSchema");
const { graphqlHTTP } = require('express-graphql');
// Allow cross access
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Apply the auth middleware to all requests
app.use(authMiddleware);

// GraphQL endpoint
app.use(
  '/sb-erp-api/graphql',
  graphqlHTTP((req, res) => ({
    schema: schema,
    // rootValue: root,
    graphiql: true,
    context: { user: req.user }, // Pass the authenticated user to the resolvers
  }))
);

// ----------------------------------------

// app.use('/sb-erp-api/graphql',graphqlHTTP({
//   schema,
//   graphiql: true,
// }));

var con = sqlConnect();

app.get("/sb-erp-api", (req, res) => {
  res.send("Hello World!");
});

// app.use('/sb-erp-api/', router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
