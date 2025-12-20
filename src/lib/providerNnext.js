import { dbConnect } from "@/lib/mongoDb";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const userCollection = await dbConnect("users");
        const user = await userCollection.findOne({
          email: credentials.email,
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // 🔹 First login (Credentials / OAuth)
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "user";
      }

      // 🔹 OAuth first time database save
      if (account && account.provider !== "credentials") {
        const userCollection = await dbConnect("users");

        const isExist = await userCollection.findOne({
          email: token.email,
          // provider: account.provider,
        });

        if (!isExist) {
          await userCollection.insertOne({
            name: token.name,
            email: token.email,
            role: "user",
            provider: account.provider,
            providerId: account.providerAccountId,
            createdAt: new Date(),
          });
        }
      }

      // ❗ ALWAYS token return
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },

  // debug: process.env.NODE_ENV === "development",
};
