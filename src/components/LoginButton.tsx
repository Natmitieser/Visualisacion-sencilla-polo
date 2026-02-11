'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function LoginButton({
    className = "",
    text = "Get Started",
    utmSource = ""
}: {
    className?: string
    text?: string
    utmSource?: string
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/auth/callback?next=/dashboard`,
            },
        })

        if (error) {
            console.error('Login error:', error)
            alert('Error sending email: ' + error.message)
            setIsLoading(false)
        } else {
            setSent(true)
            setIsLoading(false)
        }
    }

    if (sent) {
        return (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center border border-green-200">
                <p className="font-semibold">¡Link enviado!</p>
                <p className="text-sm">Revisa tu correo {email} y haz clic en el enlace para entrar.</p>
                <button
                    onClick={() => setSent(false)}
                    className="text-xs text-green-800 underline mt-2 hover:text-green-900"
                >
                    Usar otro correo
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col sm:flex-row gap-2 w-full max-w-sm mx-auto">
            <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#005DB4] focus:border-transparent outline-none"
                required
            />
            <button
                type="submit"
                disabled={isLoading}
                className={className}
            >
                {isLoading ? 'Enviando...' : 'Entrar con Email'}
            </button>
        </form>
    )
}
