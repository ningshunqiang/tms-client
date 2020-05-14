/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Redirect, Route } from "umi";

// eslint-disable-next-line import/no-cycle
import Authorized from "./Authorized";
import { IAuthorityType } from "./CheckPermissions";

interface AuthorizedRoutePops {
  currentAuthority: string;
  component: React.ComponentClass<any, any>;
  render: (props: any) => React.ReactNode;
  redirectPath: string;
  authority: IAuthorityType;
}

const AuthorizedRoute: React.SFC<AuthorizedRoutePops> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: redirectPath }} />}
      />
    }
  >
    <Route
      {...rest}
      render={(props: any) =>
        Component ? <Component {...props} /> : render(props)
      }
    />
  </Authorized>
);

export default AuthorizedRoute;
