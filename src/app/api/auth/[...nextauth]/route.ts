// pages/api/auth/[...nextauth].js
import NextAuth, { AuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongo";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "@/lib/models/user";
import bcrypt from "bcrypt";

interface MongoUser extends User {
  password: string;
}
export const auth_provider_options: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Your authentication logic here
          const { email = "", password = "" } = credentials || {};

          const client = await clientPromise;
          const db = client.db("SuiAI");
          const user = await db
            .collection("users") // Assuming your users collection is named "users"
            .findOne({ email: email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            );
            if (isPasswordCorrect) {
              return user as unknown as MongoUser;
            }
          }
          // Return null if user is not found or password is incorrect
          return null;
        } catch (error) {
          // Log the error and return null
          console.error("Error in authorize method:", error);
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      // checks: "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return `${baseUrl}/menu/dashboard`;
    // },
    async jwt({ token, user }: { token: any; user: any }) {
      // Persist the OAuth access_token and or the user id to the token right after signin

      // console.log("jwt-user", user);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
const handler = NextAuth(auth_provider_options);

export { handler as GET, handler as POST };
