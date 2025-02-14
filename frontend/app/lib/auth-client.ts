"use client"
import { createAuthClient } from "better-auth/client"
import router from "next/router"
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

export const signOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
}
