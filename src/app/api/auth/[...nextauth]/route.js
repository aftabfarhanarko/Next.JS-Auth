import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userData = [
    {name:"korim", password:1234},
    {name:"Rohim", password:5678},
]
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      //'Sign in with
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        secretCode: { label: "secretCode", type: "number" },
      },
      async authorize(credentials, req) {
        const {username, password, secretCode} = credentials;
        const user = userData.find(u => u.name == username);
          if(!user) return null;

          const isPassword = user.password == password;
          if(isPassword){
            return user;
          }


        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
    