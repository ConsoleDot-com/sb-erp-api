
const resolvers = {
    Query: {
      customers: async () => {
        const customers = await Customer.findAll();
        return customers;
      }
    },
    Mutation: {
      createCustomer: async (_, { houseNo, name, address, city }) => {
        const customer = await Customer.create({ houseNo, name, address, city });
        return customer;
      }
    }
  };
  