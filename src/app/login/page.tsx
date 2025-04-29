import React from 'react'
import Image from 'next/image'
import { Logo } from '@/components/Logo'
import { AuthForm } from '@/components/authentication/AuthForm'

const AuthenticationPage = () => {
  return (
    <main className="h-screen grid grid-cols-2 relative">

      {/* Left Side Banner  */}
      <div className="relative w-full h-full flex flex-col bg-muted text-primary-foreground">
        <div className="relative w-full h-full flex flex-col">
          <div className='w-full h-[40%] bg-gradient-to-t from-transparent to-black/50 absolute top-0 left-0 z-10' />
          <div className='w-full h-[50%] bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 z-10' />
          <Image 
            src="/waifu.jpeg" 
            alt="login-form" 
            fill
            className="object-cover rounded-lg"
          />
          <div className='relative z-20 p-10 flex items-center'><Logo /></div>
          <div className='relative z-20 mt-auto p-10'>
            <blockquote className='space-y-2 '>
              <p >
              &ldquo;Unleash the art of you — train your AI, and let SnapFusion craft stunning portraits that look and feel truly personal.&rdquo;
              </p>
              <p className='text-lg'> 
              Your face. Your style. Reimagined by AI.
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Login Section  */}
      <div className="relative flex flex-col items-center justify-center p-1 h-full ">
        <AuthForm />
      </div>

    </main>
  )
}

export default AuthenticationPage
