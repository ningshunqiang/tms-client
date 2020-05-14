import { useCurrentUserQuery } from "@/generated/graphql";
// import { setAuthority } from "@/utils/authority";

export default (...queryArgs: Parameters<typeof useCurrentUserQuery>) => {
  const result = useCurrentUserQuery(...queryArgs);

  // if (!result.loading && result.data && result.data.user) {
  //     setAuthority(result.data.user.permissionKeys);
  // }

  return result;
};
