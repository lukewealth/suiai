// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
//import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
//import clientPromise from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect, dbDisconnect} from "@/lib/db/mongoDB";
import {UserModel} from '@/lib/models/user'
import bcrypt from 'bcrypt';



export const auth_provider_options =   {
  //  adapter: MongoDBAdapter(clientPromise),
    providers: [
      CredentialsProvider({
        id:"credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
         try {
          await dbConnect()
          // Your authentication logic here
          const { email, password } = credentials;
  
          const user_exist = await UserModel.findOne({email:email})
          if(user_exist){
            const is_password_correct = await bcrypt.compare(password, user_exist.password)
            if(is_password_correct){
              return user_exist
            }
          }
         } catch (error) {
          throw Error({message:error.message})
         }
        
        },
      }),
      GitHubProvider({
        secret: process.env.SECRET,
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        checks: "both",
      }),
    ],
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
    },
    callbacks: {
      // async redirect({ url, baseUrl }) {
      //   return `${baseUrl}/menu/dashboard`;
      // },
      async jwt({ token, user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
  
        // console.log("jwt-user", user);
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token, user }) {
        // console.log("user", user);
        if (user) {
          session.user.role = user.role;
        }
  
        return session;
      },
    },
  }
export const handler = NextAuth(auth_provider_options);

export {handler as GET, handler as POST}