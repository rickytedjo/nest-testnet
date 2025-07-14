import { Controller, Get, Post } from "@nestjs/common";
import { ContractService } from "../services";
import { ProviderService } from "src/common/utils";

@Controller('contract')
export class ContractController {
    constructor(
        private readonly contractService: ContractService,
        private readonly providerService: ProviderService    
    ) {}

    @Post()
    async createContract() {
        if (!this.providerService.checkProvider()) {
            return new Error('Invalid provider configuration');
        }
        
        // Logic to create a contract
    }

    @Post(':id')
    async createTransaction(id: string) {
        if (!this.providerService.checkProvider()) {
            return new Error('Invalid provider configuration');
        }

        // Logic to create a transaction for a contract
    }

    @Get(':id')
    async getContract(id: string) {
        if (!this.providerService.checkProvider()) {
            return new Error('Invalid provider configuration');
        }

        // Logic to get a contract by ID
    }


    @Get()
    async getAllContracts() {
        if (!this.providerService.checkProvider()) {
            return new Error('Invalid provider configuration');
        }

        // Logic to get all contracts
    }
}