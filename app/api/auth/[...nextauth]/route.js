import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

// This is the route that next-auth will use to handle the auth

const handler = NextAuth({
providers: [
    GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
],
callbacks: {
    async session({ session }) {
    // store the user id from MongoDB to session
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString();

    return session;
    },
    async signIn({ account, profile, user, credentials }) {
    try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
        await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
        });
        }

        return true;
    } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
    }
    },
},
});

// Not the norm but for Next-auth this is how the docs say to do it
export { handler as GET, handler as POST };
