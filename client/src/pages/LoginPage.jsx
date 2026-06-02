
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import {
  MessageCircle,
  Mail,
  Lock,
  Eye,
  ArrowRight
  } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Link } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"


export default function LoginPage() {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const navigate = useNavigate()
    console.log(email,password);
    const {login}=useAuth()

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await login(email, password)
        navigate('/')
    } catch (err) {
        // error is already handled in context
        toast.error(err.response?.data?.message || 'Login Failed')
    }
}
    
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      {/* ============================================
          BACKGROUND GLOW EFFECTS
      ============================================ */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-30 -top-30 h-75 w-75 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-25 -right-25 h-75 w-75 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-62.5 w-62.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      {/* ============================================
          MAIN CONTENT
      ============================================ */}

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4">

        {/* ============================================
            LOGIN CONTAINER
        ============================================ */}

        <div className="w-full max-w-107.5">

          {/* ============================================
              LOGO + HEADING SECTION
          ============================================ */}

          <div className="mb-10 text-center">

            {/* Logo */}
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30">
                <MessageCircle className="h-7 w-7" />
              </div>

              <h1 className="font-[Manrope] text-4xl font-extrabold tracking-tight">
                RChat
              </h1>
            </div>

            {/* Heading */}
            <h2 className="mb-3 font-[Manrope] text-3xl font-bold">
              Welcome Back
            </h2>

            {/* Subtext */}
            <p className="text-sm text-slate-300">
              Sign in to continue your conversations.
            </p>
          </div>

          {/* ============================================
              LOGIN CARD
          ============================================ */}

          <Card className="border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/30">

            <CardContent className="space-y-6 p-8">

              {/* ============================================
                  EMAIL INPUT CARD
              ============================================ */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="h-12 border-white/10 bg-black/20 pl-12 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              {/* ============================================
                  PASSWORD INPUT CARD
              ============================================ */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

                <div className="mb-3 flex items-center justify-between">

                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="h-12 border-white/10 bg-black/20 pl-12 pr-12 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500"
                  />

                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* ============================================
                  LOGIN BUTTON
              ============================================ */}

              <Button className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white hover:bg-blue-500" onClick = {handleSubmit}>
                Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              
              

             
            </CardContent>
          </Card>

          

          {/* ============================================
              FOOTER SECTION
          ============================================ */}

          <p className="mt-8 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="font-semibold text-blue-400 hover:text-blue-300">
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      {/* ============================================
          FLOATING FEATURE CARD
      ============================================ */}

     
    </div>
  )
}