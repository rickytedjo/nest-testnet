import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";
import { ProviderService } from "src/common/utils/provider.service";
import { PostgresService } from "src/core/psql/postgres.service";
import { CreateContractDto } from "../dtos";

@Injectable()
export class ContractService {
    // Service logic will go here
    constructor(
        private readonly config: ConfigService,
        private readonly providerService: ProviderService,
        private readonly postgresService: PostgresService
    ) {}

    async createContract(dto: CreateContractDto) {
        // Logic to create a contract
        // const contractName = createContractDto.contractName;
        
        // // Example: Interact with the blockchain to deploy a contract
        // const { provider, wallet } = await this.providerService.getProviderAndWallet();
        // if (!provider || !wallet) {
        //     throw new Error("Provider or wallet not configured");
        // }
        
        // // Assuming you have a contract factory ready
        // const contractFactory = new ethers.ContractFactory(/* ABI */, /* Bytecode */, wallet);
        // const contract = await contractFactory.deploy(contractName);
        
        // const contractDB = {

        // }

        // // Save the contract address and name in the database
        // await this.postgresService.saveContract({
        //     address: contract.address,
        //     name: contractName,
        //     owner: wallet.address
        // });

        // return { address: contract.address, name: contractName };
    }

    
}