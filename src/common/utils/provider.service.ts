import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";

@Injectable()
export class ProviderService {

    constructor(private readonly config: ConfigService) {}

    async getProviderAndWallet(): Promise<{ provider: ethers.JsonRpcProvider, wallet: ethers.Wallet }> {
        try{
            const providerUrl = this.config.get<string>('SepoliaProvider.providerUrl');
            const walletKey = this.config.get<string>('SepoliaProvider.walletKey');

            if (!providerUrl || !walletKey) {
                throw new Error('Provider URL or Wallet Key is not configured');
            }
            
            const provider = new ethers.JsonRpcProvider(providerUrl);
            const wallet = new ethers.Wallet(walletKey, provider);
            return { provider, wallet };
        } catch (error) {
            throw new Error(`Failed to create provider or wallet: ${error.message}`);
        }
    }
}