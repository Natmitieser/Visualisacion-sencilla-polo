'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DashboardClient({ token, email }: { token: string, email: string }) {
    const [wallet, setWallet] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    // Payment State
    const [balanceXLM, setBalanceXLM] = useState<string>('0')
    const [balanceUSDC, setBalanceUSDC] = useState<string>('0')

    const [sending, setSending] = useState(false)
    const [showSendForm, setShowSendForm] = useState(false)
    const [destination, setDestination] = useState('')
    const [amount, setAmount] = useState('')
    const [selectedAsset, setSelectedAsset] = useState<'XLM' | 'USDC'>('XLM')

    // History State
    const [history, setHistory] = useState<any[]>([])
    const [loadingHistory, setLoadingHistory] = useState(false)

    useEffect(() => {
        async function initPoloSDK() {
            try {
                console.log('[Polo SDK] Onboarding user:', email)

                // 1. Call Polo Onboard (B2B API)
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/polo/onboard`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                })

                if (!res.ok) {
                    const errText = await res.text();
                    console.error("API Error Response:", errText);
                    let errData;
                    try {
                        errData = JSON.parse(errText);
                    } catch (e) {
                        errData = { error: `API Error ${res.status}: ${errText.slice(0, 50)}...` };
                    }
                    throw new Error(errData.error || 'Onboarding failed')
                }

                const data = await res.json()
                setWallet(data)

                // 2. Fetch Balances & History
                if (data.wallet) {
                    fetchBalances(data.wallet)
                    fetchHistory(email)
                }

            } catch (err: any) {
                console.error('Polo Error:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        initPoloSDK()
    }, [email, token])

    const fetchBalances = async (publicKey: string) => {
        try {
            const horizonRes = await fetch(`https://horizon-testnet.stellar.org/accounts/${publicKey}`)
            if (horizonRes.ok) {
                const accountData = await horizonRes.json()

                // Native (XLM)
                const native = accountData.balances.find((b: any) => b.asset_type === 'native')
                setBalanceXLM(native ? native.balance : '0')

                // USDC
                const usdc = accountData.balances.find((b: any) => b.asset_code === 'USDC')
                setBalanceUSDC(usdc ? usdc.balance : '0')
            }
        } catch (e) {
            console.warn('Balance fetch error:', e)
        }
    }

    const fetchHistory = async (userEmail: string) => {
        setLoadingHistory(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/polo/history?email=${userEmail}`)
            if (res.ok) {
                const data = await res.json()
                setHistory(data.history || [])
            }
        } catch (e) {
            console.error('History error:', e)
        } finally {
            setLoadingHistory(false)
        }
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        setSending(true)
        try {
            // Call Polo Transact (B2B API)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/polo/transact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    destination,
                    amount,
                    asset: selectedAsset
                })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Payment failed')

            setShowSendForm(false)
            setAmount('')
            setDestination('')
            alert(`¡Pago Enviado! Hash: ${data.tx_hash}`)

            // Refresh data
            window.location.reload()
        } catch (err: any) {
            alert('Error: ' + err.message)
        } finally {
            setSending(false)
        }
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    }

    if (loading) return <div className="text-center p-10">Cargando Polo SDK...</div>
    if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-[#1a1a1a]">Polo Infra Demo</h2>
                    <p className="text-xs text-gray-500">{email}</p>
                </div>
                <div className="text-right">
                    <span className="block text-xs text-gray-400 uppercase">Estado</span>
                    <span className="text-green-600 font-medium text-sm">Active ●</span>
                </div>
            </div>

            {/* BALANCES */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-6 rounded-2xl text-white shadow-lg">
                    <p className="text-xs text-gray-400 uppercase mb-1">Saldo XLM</p>
                    <div className="text-2xl font-bold">{parseFloat(balanceXLM).toFixed(2)} XLM</div>
                </div>
                <div className="bg-[#005DB4] p-6 rounded-2xl text-white shadow-lg">
                    <p className="text-xs text-blue-200 uppercase mb-1">Saldo USDC</p>
                    <div className="text-2xl font-bold">{parseFloat(balanceUSDC).toFixed(2)} USDC</div>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                {!showSendForm ? (
                    <button
                        onClick={() => setShowSendForm(true)}
                        className="w-full py-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                        Enviar Dinero
                    </button>
                ) : (
                    <form onSubmit={handleSend} className="space-y-4">
                        <h3 className="font-bold text-lg">Nueva Transferencia</h3>

                        <div className="flex gap-2 mb-4">
                            <button
                                type="button"
                                onClick={() => setSelectedAsset('XLM')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium ${selectedAsset === 'XLM' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                                XLM (Nativo)
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedAsset('USDC')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium ${selectedAsset === 'USDC' ? 'bg-[#005DB4] text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                                USDC (Stablecoin)
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Destinatario (Address)</label>
                            <input
                                type="text" required placeholder="G..." value={destination}
                                onChange={e => setDestination(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                            <input
                                type="number" required step="0.0000001" placeholder="0.00" value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 ring-black"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button type="button" onClick={() => setShowSendForm(false)} className="flex-1 py-3 border rounded-xl">Cancelar</button>
                            <button type="submit" disabled={sending} className="flex-1 py-3 bg-black text-white rounded-xl">
                                {sending ? 'Enviando...' : 'Confirmar'}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* HISTORY */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-4">Historial Reciente</h3>
                {loadingHistory ? (
                    <div className="text-gray-500 text-sm">Cargando transacciones...</div>
                ) : (
                    <div className="space-y-3">
                        {history.length === 0 && <p className="text-gray-400 text-sm">No hay movimientos aún.</p>}
                        {history.map((tx: any) => (
                            <div key={tx.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {tx.type === 'payment' ? 'Pago Enviado/Recibido' : tx.type}
                                    </div>
                                    <div className="text-xs text-gray-400 font-mono truncate w-32">
                                        {new Date(tx.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className={`font-mono font-medium ${tx.type === 'payment' ? 'text-black' : 'text-gray-500'}`}>
                                    {/* Horizon returns generic records, simplified for demo */}
                                    {tx.type === 'create_account' ? '+2.0 XLM' : 'Ver detalle'}
                                </div>
                                <a href={`https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}`} target="_blank" className="text-blue-600 text-xs hover:underline">
                                    Explorer ↗
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center pt-4">
                <button onClick={handleSignOut} className="text-sm text-gray-400 hover:text-gray-600">Cerrar Sesión</button>
            </div>
        </div>
    )
}
