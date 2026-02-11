import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function Dashboard() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/')
    }

    // Get the session token to pass to the client for Backend API calls
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const email = user.email;

    if (!token || !email) {
        return redirect('/');
    }

    return (
        <div className="min-h-screen bg-[#f0f7ff] p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-[#1a1a1a] mb-8">
                    Welcome back, {user.email}
                </h1>

                <DashboardClient token={token} email={email} />
            </div>
        </div>
    )
}
