import { signIn } from "next-auth/react";

export const handleSignIn = (e) => {
  e.preventDefault();
  signIn(undefined, { callbackUrl: "/admin" });
};
