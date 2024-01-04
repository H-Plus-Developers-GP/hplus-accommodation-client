import CustomerModel from "@/model/customer";
import { connectDB } from "@/utils/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: {},
        password: {}
      },
      async authorize(credentials, req) {
        connectDB();
        const customer = await CustomerModel.findOne({ phone: credentials?.phone });
        if (!customer) {
          throw new Error("Invalid Credentials");
        }
        const isValidPassword = await customer.comparePassword(credentials?.password);
        if (!isValidPassword) {
          throw new Error("Invalid Credentials");
        }
        return { id: customer._id, username: customer.username, phone: customer.phone };
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log({ ...user, id: user.id.toString() });
      return token;
    }
  }
});

export { handler as GET, handler as POST };