import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";

@Injectable()
export class ProviderService {

    constructor(private readonly config: ConfigService) {}

    async checkProvider(): Promise<boolean> {
        const providerUrl = this.config.get<string>('SepoliaProvider.providerUrl');
        const walletKey = this.config.get<string>('SepoliaProvider.walletKey');

        try {
            if (!providerUrl || !walletKey) {
                throw new Error('Provider URL or Wallet Key is not set in the environment variables.');
            }

            // Throws if provider URL is invalid
            const provider = new ethers.JsonRpcProvider(providerUrl);

            //Throws if wallet key is invalid
            const wallet = new ethers.Wallet(walletKey, provider);
            const address = await wallet.getAddress();
        }
        catch (error) {
            console.error('Invalid provider or wallet key:', error);
            return false;
        }

        return true;
    }
}