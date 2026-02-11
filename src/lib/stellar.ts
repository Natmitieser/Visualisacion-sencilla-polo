import { Horizon, Keypair, TransactionBuilder, Operation, Asset, Account, TimeoutInfinite } from '@stellar/stellar-sdk';

// ---------------------------------------------------------
// 1. Signer Service (Sponsor Logic)
// ---------------------------------------------------------
class SignerService {
    private static SPONSOR_KEYPAIR: Keypair;

    static initialize() {
        const secret = process.env.SPONSOR_SECRET_KEY;
        if (!secret) {
            throw new Error('SPONSOR_SECRET_KEY is not defined in .env');
        }
        this.SPONSOR_KEYPAIR = Keypair.fromSecret(secret);
    }

    static signWithSponsor(tx: any) {
        if (!this.SPONSOR_KEYPAIR) {
            this.initialize();
        }
        tx.sign(this.SPONSOR_KEYPAIR);
        return tx;
    }

    static getSponsorPublicKey(): string {
        if (!this.SPONSOR_KEYPAIR) {
            this.initialize();
        }
        return this.SPONSOR_KEYPAIR.publicKey();
    }
}

// ---------------------------------------------------------
// 2. Horizon Service (Network Interaction)
// ---------------------------------------------------------
export class HorizonService {
    private static server: Horizon.Server;

    static initialize() {
        // Default to Testnet for this project
        this.server = new Horizon.Server('https://horizon-testnet.stellar.org');
    }

    static async loadAccount(publicKey: string) {
        if (!this.server) this.initialize();
        return await this.server.loadAccount(publicKey);
    }

    static async submitTransaction(tx: any) {
        if (!this.server) this.initialize();
        try {
            const result = await this.server.submitTransaction(tx);
            return { success: true, hash: result.hash };
        } catch (e: any) {
            console.error('Stellar Submission Error:', e.response?.data?.extras?.result_codes || e.message);
            return {
                success: false,
                error: e.response?.data?.extras?.result_codes || e.message
            };
        }
    }

    static async getPaymentsHistory(publicKey: string, limit: number = 10) {
        if (!this.server) this.initialize();
        try {
            const response = await this.server.payments().forAccount(publicKey).limit(limit).order('desc').call();
            return {
                success: true,
                records: response.records
            };
        } catch (e: any) {
            console.error('History Fetch Error:', e.message);
            return { success: false, records: [] };
        }
    }
}

// ---------------------------------------------------------
// 3. Transaction Service (Building Logic)
// ---------------------------------------------------------
class TransactionService {
    private static USDC_ISSUER_TESTNET = 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5';
    private static USDC_ASSET_CODE = 'USDC';

    static buildOnboardingTx(sponsorAccount: Account, newAccountPublicKey: string) {
        const usdcAsset = new Asset(this.USDC_ASSET_CODE, this.USDC_ISSUER_TESTNET);

        const txBuilder = new TransactionBuilder(sponsorAccount, {
            fee: '100',
            networkPassphrase: 'Test SDF Network ; September 2015',
            timebounds: { minTime: 0, maxTime: 0 },
        });

        txBuilder.addOperation(
            Operation.createAccount({
                destination: newAccountPublicKey,
                startingBalance: '2.0',
                source: sponsorAccount.accountId(),
            })
        );

        txBuilder.addOperation(
            Operation.changeTrust({
                asset: usdcAsset,
                source: newAccountPublicKey,
            })
        );

        return txBuilder.build();
    }

    static buildPaymentTx(
        sourcePublicKey: string,
        destinationPublicKey: string,
        amount: string,
        sequence: string,
        assetCode: 'XLM' | 'USDC' = 'XLM'
    ) {
        let asset;
        if (assetCode === 'USDC') {
            asset = new Asset(this.USDC_ASSET_CODE, this.USDC_ISSUER_TESTNET);
        } else {
            asset = Asset.native();
        }

        const account = new Account(sourcePublicKey, sequence);

        const txBuilder = new TransactionBuilder(account, {
            fee: '100',
            networkPassphrase: 'Test SDF Network ; September 2015',
            timebounds: { minTime: 0, maxTime: 0 },
        });

        txBuilder.addOperation(
            Operation.payment({
                destination: destinationPublicKey,
                asset: asset,
                amount: amount,
            })
        );

        return txBuilder.build();
    }
}

// ---------------------------------------------------------
// 4. Wallet Service (Onboarding)
// ---------------------------------------------------------
export class WalletService {
    static async createFundedWallet() {
        const userKeypair = Keypair.random();
        const userPublicKey = userKeypair.publicKey();

        const sponsorPublicKey = SignerService.getSponsorPublicKey();
        const sponsorAccount = await HorizonService.loadAccount(sponsorPublicKey);

        const tx = TransactionService.buildOnboardingTx(sponsorAccount, userPublicKey);

        SignerService.signWithSponsor(tx);
        tx.sign(userKeypair);

        const result = await HorizonService.submitTransaction(tx);

        if (result.success) {
            return {
                success: true,
                publicKey: userPublicKey,
                secretKey: userKeypair.secret(),
                hash: result.hash
            };
        } else {
            throw new Error(`Stellar Error: ${JSON.stringify(result.error)}`);
        }
    }
}

// ---------------------------------------------------------
// 5. Payment Service (Sending)
// ---------------------------------------------------------
export class PaymentService {
    static async sendPayment(senderSecret: string, destinationPublicKey: string, amount: string, assetCode: 'XLM' | 'USDC' = 'XLM') {
        const senderKeypair = Keypair.fromSecret(senderSecret);
        const senderPublicKey = senderKeypair.publicKey();

        const senderAccount = await HorizonService.loadAccount(senderPublicKey);

        const tx = TransactionService.buildPaymentTx(
            senderPublicKey,
            destinationPublicKey,
            amount,
            senderAccount.sequence,
            assetCode
        );

        tx.sign(senderKeypair);

        const result = await HorizonService.submitTransaction(tx);

        if (result.success) {
            return {
                success: true,
                hash: result.hash
            };
        } else {
            throw new Error(`Payment Failed: ${JSON.stringify(result.error)}`);
        }
    }
}
