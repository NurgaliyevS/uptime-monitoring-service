import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "@/backend/mongodbClient";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
          variant_name: "free",
        };
      },
    }),
    ...(clientPromise
      ? [
          EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: "noreply@mg.uptimefriend.com",
          }),
        ]
      : []),
  ],
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    logo: `https://uptimefriend.com/logoAndName200x50.png`,
  },
};

export default NextAuth(authOptions);
