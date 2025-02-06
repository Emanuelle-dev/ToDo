"use client"

import { GalleryVerticalEnd } from "lucide-react"

import * as React from "react"

import { SignUpForm } from "../../../components/ui/sign-up"
export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-2 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          {/* <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> */}
            {/* <GalleryVerticalEnd className="size-4" /> */}
          {/* </div> */}
        </a>
        <h2 className="text-center grid gap-2 font-semibold text-2xl">
          Crie sua conta
        </h2>
        <SignUpForm />
      </div>
    </div>
  )
}