/* eslint-disable import/no-extraneous-dependencies */

require("dotenv").config();

const { SERVER_URL } = process.env;

module.exports = {
  client: {
    service: {
      url: `${SERVER_URL}/graphql`,
    },
  },
};
