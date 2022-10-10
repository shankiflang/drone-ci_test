import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import moment from 'moment';



async function refreshAccessToken(token: any) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: token.refreshToken
            })
        })

        const refreshedTokens = await res.json();

        if (!res.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.data.access_token,
            accessTokenExpires: Date.now() + 1000 * 15 * 60,
            refreshToken: refreshedTokens.data.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        if (moment(new Date(token.accessTokenExpires)).isBefore(new Date()) ) {
            // If session expired, logout
            return {
                ...token,
                accessToken: undefined,
                accessTokenExpires: undefined,
                refreshToken: undefined,
            }
        }

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}


let refreshUrls = ['apollo']

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            CredentialsProvider({
                name: 'credentials',
                credentials: {
                    email: { label: 'Email', type: 'text', placeholder: 'Email' },
                    password: { label: 'Password', type: 'password', placeholder: 'Password' },
                    admin: { label: '_admin', type: 'text', placeholder: '_admin' },
                    otp: { label: 'OTP', type: 'text', placeholder: 'OTP' },
                },
                async authorize(credentials) {
                    const payload = {
                        email: credentials?.email,
                        password: credentials?.password,
                    }

                    if (credentials?.otp) {
                        // @ts-ignore
                        payload.otp = credentials?.otp
                    }

                    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    })

                    const user = await res.json();

                    if (user.errors) {
                        if (user.errors[0].message.includes('otp')) {
                            throw new Error('OTP.');
                        }
                    }

                    if (!res.ok) {
                        throw new Error('Identifiants incorrects.');
                    }
                    
                    // If user need to be admin check if admin
                    if (credentials?.admin === 'true') {
                        const adminUserRes = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users/me?fields=role.*', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.data.access_token}`,
                            }
                        })
    
                        const adminUser = await adminUserRes.json();

                        if (adminUser?.data?.role?.name !== 'Administrator') {
                            throw new Error('Identifiants incorrects.');
                        }
    
                        if (res.ok && user && adminUser) {
                            return user;
                        }
                    } else {
                        if (res.ok && user) {
                            return user;
                        }
                    }

                    return null
                }
            })
        ],
        session: {
            // @ts-ignore
            jwt: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        },
        jwt: {
            secret: 'secret_code',
        },
        callbacks: {
            async jwt({ token, user, account }) {
                if (account && user) {
                    return {
                        ...token,
                        // @ts-ignore
                        accessToken: user.data.access_token,
                        accessTokenExpires: Date.now() + 1000 * 15 * 60,
                        // @ts-ignore
                        refreshToken: user.data.refresh_token,
                    }
                }

                // Return previous token if the access token has not expired yet
                // @ts-ignore
                if (Date.now() < token.accessTokenExpires) {
                    return token
                }

                // Access token has expired, try to update it
                if (req?.url && refreshUrls.includes(req?.url?.split('origin=')[1])) {
                    return refreshAccessToken(token)
                } else {
                    return token
                }
            },
            async session({ session, token }) {
                // @ts-ignore
                session.user.accessToken = token.accessToken
                // @ts-ignore
                session.user.refreshToken = token.refreshToken

                return session
            }
        },
        pages: {
            // @ts-ignore
            login: '/login',
        }
    })
}