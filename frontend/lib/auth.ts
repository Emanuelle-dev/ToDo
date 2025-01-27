import { betterAuth } from "better-auth"
import { Pool } from "pg"
 
export const auth = betterAuth({
    database: new Pool({
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            port: process.env.POSTGRES_PORT as number | undefined
        }),

     emailAndPassword: {  
            enabled: true
        },
    
    socialProviders: { 
            github: { 
             clientId: process.env.GITHUB_CLIENT_ID || "",
             clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
            } 
    }

})

