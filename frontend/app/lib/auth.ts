import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({

    database: new Pool({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT as number | undefined
    }),

    
    user: {
        modelName: "app_user",
        fields: {
            name: "name",
            email: "email",
            emailVerified: "email_verified",
            image: "image",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    },
    
    session: {
        modelName: "app_session",
        fields: {
            userId: "user_id",
            token: "token",
            expiresAt: "expires_at",
            ipAddress: "ip_address",
            userAgent: "user_agent",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    },
    
    account: {
        modelName: "app_account",
        fields: {
            userId: "user_id",
            accountId: "account_id",
            providerId: "provider_id",
            accessToken: "access_token",
            refreshToken: "refresh_token",
            accessTokenExpiresAt: "access_token_expires_at",
            refreshTokenExpiresAt: "refresh_token_expires_at",
            idToken: "id_token",
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
    
    verification: {
        modelName: "app_verification",
        fields: {
            identifier: "identifier",
            value: "value",
            expiresAt: "expires_at",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    },
    
    socialProviders: {
        github: {
            enabled: true,
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        },
        google: {
            enabled: true,
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        },
    },
    
    emailAndPassword: { 
        enabled: true, 
      }, 

})