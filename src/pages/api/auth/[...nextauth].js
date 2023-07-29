/*import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import {MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI)

export default NextAuth({
    providers: [
        Provers.Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials){
                const user = { id: 1, name: }
            }
        })
    ]
})

//callbacks go here 
//defines who is a customer vs admin with the use of tokens too.

*/
//THIS IS INCOMPLETE

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
//import { MongoClient } from 'mongodb'
import { getDatabase } from '../db'
import bcrypt from 'bcrypt'

export default NextAuth({
    providers:[
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
        
            authorize: async (credentials) => {
                const { email, password } = credentials;

                if(!email || email.trim().length === 0 || !password || password.trim().length === 0){
                    throw new Error('Invalid email or password!');
                }

                const db = await getDatabase();
                const clientProfile = db.collection('ClientInfo');

                const user = await clientProfile.findOne({ email });
                if(!user){
                    throw new Error('Invalid email or password');
                }

                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if(!isPasswordMatch){
                    throw new Error('Invalid email or password!');
                }

                return {id: user._id.toString()}; //user's _id will be saved into JWT
            },
        }),
    ],

    database: process.env.DATABASE_URL,
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if(user){
                token.id = user.email;      //email is used as id here. Maybe change it to db _id?
            }
            return token;
        },
        async session(session ,token){
            session.userId = token.id;
            return session;
        },
    },
});