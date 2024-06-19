import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { NextURL } from "next/dist/server/web/next-url"
import{
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes

}from "./routes"

const {auth}=NextAuth(authConfig)

export default auth((req)=>{
    const {nextUrl}=req
    const isLoggedIn=false

const isApiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix)
const isPublicRoute=publicRoutes.includes(nextUrl.pathname)
const isAuthRoute=authRoutes.includes(nextUrl.pathname)
if(isApiAuthRoute){
    return 
}
if(isAuthRoute){
    if(isLoggedIn){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    return 
}
if(!isLoggedIn&&!isPublicRoute){
    return Response.redirect(new URL("/auth/login",nextUrl))
}
  return 
})

export const config={
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}