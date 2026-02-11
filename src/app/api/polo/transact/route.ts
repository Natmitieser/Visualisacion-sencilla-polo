import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { decrypt } from '@/lib/encryption';
import { PaymentService } from '@/lib/stellar';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, destination, amount, asset } = body;

        if (!email || !destination || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const assetCode = asset === 'USDC' ? 'USDC' : 'XLM';

        // Use Admin Client
        const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 1. Retrieve Encrypted Key
        const { data: wallet } = await supabase
            .from('user_wallets')
            .select('encrypted_secret_key, iv')
            .eq('email', email)
            .single();

        if (!wallet) {
            return NextResponse.json({ error: 'User wallet not found. Call /onboard first.' }, { status: 404 });
        }

        // 2. Decrypt in Memory
        const secretKey = decrypt(wallet.encrypted_secret_key, wallet.iv);

        // 3. Execute Transaction via Layer 3
        console.log(`[Polo SDK] Transaction: ${email} -> ${amount} ${assetCode} -> ${destination}`);
        const result = await PaymentService.sendPayment(
            secretKey,
            destination,
            amount,
            assetCode
        );

        // 4. Return Receipt (Hash)
        return NextResponse.json({
            status: 'success',
            tx_hash: result.hash,
            asset: assetCode,
            amount: amount
        });

    } catch (error: any) {
        console.error('Transact Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
