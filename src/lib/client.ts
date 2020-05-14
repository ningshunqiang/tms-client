import ApolloClient from "apollo-boost";

export default new ApolloClient({
  // eslint-disable-next-line no-undef
  uri: `${SERVER_URL}/graphql`,
  request: (operation) => {
    const token = localStorage.getItem("token");

    operation.setContext({
      headers: {
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    });
  },
});
