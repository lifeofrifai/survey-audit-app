import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import BASE_URL from '../../../config';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/loginpublic`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });
                    if (response.data.code === 200) {
                        return {
                            email: response.data.data.email,
                            name: response.data.data.name,
                            nim: response.data.data.nim,
                            id: response.data.data.id,
                            role: response.data.data.role,
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Login failed:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.nim = user.nim;
                token.role = user.role;
            }
            return token;
        },
        async session(session, token) {
            session.user = token.id;
            session.email = token.email;
            session.name = token.name;
            session.nim = token.nim;
            session.role = token.role;
            return session;
        }
    },
    secret: process.env.SECRET,

});