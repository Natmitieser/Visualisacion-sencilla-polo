import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { encrypt } from '@/lib/encryption';
import { WalletService } from '@/lib/stellar';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email (Client User ID) is required' }, { status: 400 });
        }

        // Use Admin Client to bypass RLS (Match Backend behavior)
        const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 1. Check if user already exists
        const { data: existingWallet } = await supabase
            .from('user_wallets')
            .select('*')
            .eq('email', email)
            .single();

        if (existingWallet) {
            return NextResponse.json({
                status: 'active',
                wallet: existingWallet.public_key,
                message: 'User already onboarded'
            });
        }

        // 2. Create new Wallet (Atomic: Keypair + Sponsor Fund + USDC Trust)
        console.log(`[Polo SDK] Onboarding user: ${email}...`);
        const stellarWallet = await WalletService.createFundedWallet();

        // 3. Encrypt Private Key (The Vault)
        const { iv, content } = encrypt(stellarWallet.secretKey);

        // 4. Save to DB
        // Note: Using Service Role Key here is implicit if configured in Supabase Client for backend
        // But for Next.js Server Actions/Routes we typically use the standard client with proper permissions 
        // OR we need a SERVICE_ROLE client if RLS blocks inserts.
        // For simplicity in this demo, assuming standard client works or RLS is configured.
        const { error: insertError } = await supabase
            .from('user_wallets')
            .insert({
                email: email,
                public_key: stellarWallet.publicKey,
                encrypted_secret_key: content,
                iv: iv
            });

        if (insertError) throw new Error(`DB Error: ${insertError.message}`);

        return NextResponse.json({
            status: 'created',
            wallet: stellarWallet.publicKey,
            balance: '2.0 XLM (0 USDC)',
            check_hash: stellarWallet.hash
        });

    } catch (error: any) {
        console.error('Onboard Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
