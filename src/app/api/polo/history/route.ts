import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { HorizonService } from '@/lib/stellar';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
        }

        // Use Admin Client
        const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 1. Get Public Key from DB
        const { data: wallet } = await supabase
            .from('user_wallets')
            .select('public_key')
            .eq('email', email)
            .single();

        if (!wallet) {
            return NextResponse.json({ error: 'User wallet not found' }, { status: 404 });
        }

        // 2. Fetch History from Stellar Horizon
        const history = await HorizonService.getPaymentsHistory(wallet.public_key);

        return NextResponse.json({
            status: 'success',
            history: history.records
        });

    } catch (error: any) {
        console.error('History Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
