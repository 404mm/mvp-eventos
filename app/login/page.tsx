"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "@/lib/firebase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const auth = getAuth(app)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      router.push("/dashboard")
    } catch {
      setError("Email o contraseña incorrectos, o bien ese usuario ya está registrado.")
    }
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{isRegistering ? "Registrar" : "Iniciar sesión"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border w-full px-4 py-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border w-full px-4 py-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
          {isRegistering ? "Registrar" : "Entrar"}
        </button>
        <button type="button" className="w-full mt-2" onClick={() => setIsRegistering(x => !x)}>
          {isRegistering ? "Ya tengo cuenta" : "Crear cuenta nueva"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  )
}
