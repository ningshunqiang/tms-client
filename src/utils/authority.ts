/* eslint-disable import/no-cycle */

import { reloadAuthorized } from "./Authorized";

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(authority: string[] = []): string[] {
  if (authority && authority.length > 0) {
    return authority;
  }

  try {
    return JSON.parse(localStorage.getItem("authority") || "[]");
  } catch (err) {
    return authority;
  }
}

export function setAuthority(authority: string[] = []): void {
  localStorage.setItem("authority", JSON.stringify(authority));

  // auto reload
  reloadAuthorized();
}
