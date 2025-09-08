
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import  connectToDB  from "@/database";

const authOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks : {
        async signIn({ user, account}) {
            if (account.provider === 'google') {
                const {name, email} = user;
                try {
                    await connectToDB();
                    const isUserExists = await User.findOne({email});
                    if (!isUserExists) {
                        const res = await fetch("/api/user", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({name, email})
                        })
                        if (res.success) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };