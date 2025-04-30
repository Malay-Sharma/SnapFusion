"use client"
import React, { useId, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from "sonner"
import { redirect, useRouter } from 'next/navigation'
import { signup } from '@/app/actions/auth-actions'

const passwordValidatorRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

const formSchema = z.object({
    username: z.string().min(8, {
      message: "Your name must be least 8 characters long"
    }),
    email: z.string().email({
        message: "Please enter a valid email address!!"
    }),
    password: z.string({
        required_error: "Password is required !!"
    }).min(8 ,{
      message: "Password must be atleast 8 characters long"
    }).regex(
      passwordValidatorRegex, {
        message: "Password is not strong"
      }
    ),
    confirmPassword: z.string({
      required_error: "Confirm password is required !!"
    })

  }).refine(data => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ["confirmPassword"]
  })

export const SignupForm = ({className}:{className?: string}) => {
  // const router = useRouter()

  const [loading, setLoading] = useState(false);

  const toastId = useId();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      toast.loading("Signing up ....",{id: toastId})
      setLoading(true)
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const formData = new FormData()
        formData.append('username', values.username)
        formData.append('email', values.email)
        formData.append('password', values.password)

        const {success, error} = await signup(formData)
        if (!success){
          toast.error(String(error), {id: toastId})
          setLoading(false)
        }else{
          toast.success("Signed up successfully!!", {id:toastId})
          setLoading(false)
          redirect('/login')  // ✅ Client-side redirect
        }

        console.log(values)
      }

  return (
    <div className={cn("grid gap-6", className)}>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />            
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="shname@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type='password' placeholder="Enter Your password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                    <Input placeholder="confirm your password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <Button type="submit" className='w-full' disabled={loading}>{loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}Sign Up</Button>
        </form>
        </Form>
    </div>
  )
}
