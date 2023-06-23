const express = require("express");
const { sqlConnect } = require("./helper/db-connect");
var cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config("../.env");
const port = 3000;
const {router} = require('./routes/auth.routes');
const { authMiddleware } = require("./middleware/auth.middleware");
const { root } = require("./controller/auth.resolver");
const { schema } = require("./schema/schema");
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

var con = sqlConnect();

app.get("/sb-erp-api", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
