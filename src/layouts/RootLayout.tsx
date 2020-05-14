import { ApolloProvider } from "@apollo/react-hooks";
import React, { ReactElement, SFC } from "react";

import client from "@/lib/client";

const RootLayout: SFC = ({ children }): ReactElement => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default RootLayout;
