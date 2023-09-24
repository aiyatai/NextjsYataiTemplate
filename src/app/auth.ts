import type { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    {
      id: "Yatai",
      name: "Yatai",
      type: "oauth",
      idToken: true,
      clientId: process.env.CLIENT_ID, // 取得した　Client ID
      clientSecret: process.env.CLIENT_SECRET, // 取得した Client Secret
      wellKnown: `${process.env.AIYATAI_API_ENDPOINT}/o/.well-known/openid-configuration/`, //
      profile: async (profile: any) => {
        return {
          id: profile.sub,
          email: profile.email,
        };
      },
      httpOptions: {
        timeout: 10000, // 少し長めに設定
      },
    },
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {},
  secret: process.env.NEXTAUTH_SECRET,
};
