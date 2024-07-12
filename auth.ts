import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { sql } from "@vercel/postgres";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [Credentials({
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "username@example.com",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "********",
          },
        },
        async authorize(credentials, req) {

          const response = await sql`
          SELECT * FROM users WHERE email=${credentials?.email as string}
          `

          const user = response.rows[0]
          const passwordCorrect = await bcrypt.compare(credentials?.password as string, user.password)

          if (passwordCorrect) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            }
          }

          return null
        }
      }),],
})