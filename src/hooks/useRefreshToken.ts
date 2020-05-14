import { useCallback } from "react";

import { useRefreshTokenMutation } from "@/generated/graphql";

export function useRefreshToken(): () => void {
  const [refreshToken] = useRefreshTokenMutation();

  return useCallback(async (): Promise<void> => {
    const result = await refreshToken({
      variables: { token: localStorage.getItem("token") },
    });
    localStorage.setItem("token", result.data.refreshToken.token);
  }, [refreshToken]);
}
