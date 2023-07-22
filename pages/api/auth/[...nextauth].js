import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from '@/database/conn'
import Users from '@/model/Schema'
import { compare } from 'bcryptjs'

export default NextAuth({
  providers: [
   
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name:"Credentials",
      async authorize(credentials,req){
        connectMongo().catch(error=>{error:"Connection Failed!"})
        // check user existance 
        const result = await Users.findOne({email:credentials.email})
        if(!result){
          throw new Error ("No user found with email...Please Sign Up again!")
        }
        // compare 
        const checkPassword = await compare(credentials.password, result.password);
        // incorrect password
        if(!checkPassword|| result.email !==credentials.email){
          throw new Error("Username or Password doesn't match")
        } 
        return result;
      }
    })
   
  ],
  secret:"sadsadas33refdfsdfsdfdsda#$#%#s",
  // adapter: MongoDBAdapter(clientPromise),
})