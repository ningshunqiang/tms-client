/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useHistory } from "react-router";

import { useGetTokenMutation } from "@/generated/graphql";
import { getPageQuery } from "@/utils/utils";

export default (...mutationArgs: Parameters<typeof useGetTokenMutation>) => {
  const history = useHistory();

  const tuple = useGetTokenMutation(...mutationArgs);

  const temp = tuple[0];

  tuple[0] = async (...args: Parameters<typeof tuple[0]>) => {
    const result = await temp(...args);

    if (result.data) {
      localStorage.setItem("token", result.data.getToken.token);

      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params as { redirect: string };

      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf("#") + 1);
          }
        } else {
          window.location.href = "/";
          return result;
        }
      }

      history.replace(redirect || "/");
    }

    return result;
  };

  return tuple;
};
