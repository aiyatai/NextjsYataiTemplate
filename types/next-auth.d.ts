import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access?: accessToken;
    error?: string;
    user: {
      /** Oauth access token */
      id: string;
      email: string;
    };
  }
}
