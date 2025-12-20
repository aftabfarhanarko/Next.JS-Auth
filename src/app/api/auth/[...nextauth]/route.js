import { dbConnect } from "@/lib/mongoDb";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Session strategy explicitly JWT set kora (CredentialsProvider er jonno recommended)
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // Basic validation
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;

        console.log("Login attempt:", email);

        try {
          // Database collection/model access
          const userCollection = await dbConnect("users");

          // Find user by email
          const user = await userCollection.findOne({ email });

          console.log("Found user:", user ? "Yes" : "No");

          if (!user) {
            return null; // User not found
          }

          // Compare password
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return null; // Wrong password
          }

          // Return user object (ei object ta jwt callback e pawa jabe)
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "user", // fallback role
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
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
    // JWT token e custom data (role) add kora
    async jwt({ token, user }) {
      // First time sign-in e user object thake (authorize theke)
      if (user) {
        token.role = user.role;
        token.image = user.image;
        // Jodi ar extra field lagbe (id, name etc.)
        // token.id = user.id;
      }
      return token;
    },

    // Session e role add kora (client side e useSession() diye pawa jabe)
    async session({ session, token }) {
      // Token theke role session e pass kora
      if (token?.role) {
        session.role = token.role;
      }

      // Optional: session.user object e role chaile (standard way)
      // if (session?.user) {
      //   session.user.role = token.role || "user";
      // }

      return session;
    },
  },

  // Optional: custom pages (jodi chaile)
  // pages: {
  //   signIn: "/login", // tomar custom login page thakle
  //   error: "/login", // error page
  // },

  // Debug mode (development e helpful)
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
