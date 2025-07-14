import { SepoliaProvider } from "../types";
import { registerAs } from "@nestjs/config";

export default registerAs<SepoliaProvider>('SepoliaProvider', ()=>({
    providerUrl: process.env.INFURIA_SEPOLIA_PROVIDER || null,
    walletKey: process.env.WALLET_KEY || null,
}));