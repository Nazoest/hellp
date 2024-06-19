"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from"zod"
import { LoginSchema } from "@/schemas"
import{useForm} from "react-hook-form"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Form,FormControl,FormField,FormLabel,FormMessage,FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useTransition,useState } from "react"

export const LoginForm=()=>{
    const[error,setError]=useState<string|undefined>("")
    const[success,setSuccess]=useState<string|undefined>("")
    const[isPending,startTransition]=useTransition()
    const form=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
          email:"",
          password:""
        }
      })

      const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
        setError("")
        setSuccess("")
        startTransition(()=>{
            login(values)
            .then(
                (data)=>{
                  if(!data)return 
                  if(data.error){
                    return <FormError message={data.error}/>
                  }
                }
            ) .catch((error) => {
              console.error('Error logging in:', error);
            });

        })
      }
return (
<CardWrapper
headerLabel="Welcome Back"
backButtonLabel="Don't have an Account?"
backButtonHref="/auth/register"
showSocial
>
<Form {...form}>
 <form 
 onSubmit={form.handleSubmit(onSubmit)}
 className="space-y-6">
  <div className="space-y-4">
    <FormField 
    control={form.control}
    name="email"
    render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} 
            placeholder="john.doe@example.com"
            type="email"
            disabled={isPending}
            />
            
          </FormControl>
          <FormMessage/>
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
            <Input {...field} 
            placeholder="******"
            type="password"
            disabled={isPending}
            />
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
  </div>
  <FormError message={error}/>
  <FormSuccess message={success}/>
  <Button 
  type="submit"
  className="w-full"
  disabled={isPending}
  >
    Login
  </Button>
 </form>
</Form>
</CardWrapper>)
}

