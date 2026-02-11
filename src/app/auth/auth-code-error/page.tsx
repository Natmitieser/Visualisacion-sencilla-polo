'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
    const searchParams = useSearchParams()
    const errorDescription = searchParams.get('error_description')

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Enlace expirado o inválido</h2>

            <p className="text-gray-500 mb-6 text-sm">
                {errorDescription || "El enlace mágico ya fue usado o ha caducado."}
                <br />
                Por favor, intenta iniciar sesión nuevamente.
            </p>

            <Link
                href="/"
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#005DB4] border border-transparent rounded-md hover:bg-[#0047a0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005DB4]"
            >
                Volver al inicio
            </Link>
        </div>
    )
}

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <Suspense fallback={<div>Cargando...</div>}>
                    <ErrorContent />
                </Suspense>
            </div>
        </div>
    )
}
