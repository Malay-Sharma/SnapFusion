"use client"
import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignUpForm'
import { Button } from '../ui/button'
import { ResetForm } from './ResetForm'

export const AuthForm = () => {
    const [mode, setMode] = useState('login')
  return (
    <div className='space-y-6 w-full p-10'>
        <div className="flex flex-col space-y-2  border-2 border-black-500 rounded-lg p-10">
            <h1 className='text-2xl font-semibold text-center'>
                {
                    mode === "reset"? "Reset Password" : mode === "login"? "Login": "Sign Up"
                }
            </h1>
            {/* <p className='text-sm text-muted-foreground'>
                {
                    mode === "reset"? " (Enter your email below to reset your password)" : mode === "login"? " (Enter your credentials below to login)": " Enter your email below to sign Up"
                }
            </p> */}
            {
                mode === "login" && <>
                <LoginForm />
                <div className='text-center flex justify-between'>
                    <Button variant={"link"} className='p-0' onClick={() => setMode("signup")}>
                        Need an account? Sign Up
                    </Button>
                    <Button variant={"link"} className='p-0' onClick={() => setMode("reset")}>
                        Forgot Password
                    </Button>
                </div>
                </>
            }
            {
                mode === "signup" && <>
                <SignupForm />
                <div className='text-center'>
                    <p>OR</p>
                    <Button variant={"link"} className='p-0' onClick={() => setMode("login")}>
                        Already have an Account? Sign In
                    </Button>
                </div>
                </>
            }
            {
                mode === "reset" && <>
                <ResetForm />
                <div className='text-center'>
                    <p>OR</p>
                    <Button variant={"link"} className='p-0' onClick={() => setMode("login")}>
                        Back to login
                    </Button>
                </div>
                </>
            }

            
        </div>
    </div>
  )
}
