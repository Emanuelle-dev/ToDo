import { createAuthClient } from "better-auth/client"
const authClient =  createAuthClient()
 
export const signIn = async () => {
    await authClient.signIn.social({
        provider: "github",
        callbackURL: ""
    })
}

export const signInWithGoogle = async () => {
     await authClient.signIn.social({
        provider: "google",
        callbackURL: ""
    })
}