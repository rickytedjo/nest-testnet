import { Body, Controller, Get, Post } from "@nestjs/common";
import { ContractService } from "../services";
import { ProviderService } from "src/common/utils";
import { CreateContractDto } from "../dtos";

@Controller('contract')
export class ContractController {
    constructor(
        private readonly contractService: ContractService,
        private readonly providerService: ProviderService    
    ) {}

    @Post()
    async createContract(@Body() dto: CreateContractDto) {
        // Logic to create a contract
        return this.contractService.createContract(dto);
    }

    @Post(':id')
    async createTransaction(id: string) {
        // Logic to create a transaction for a contract
    }

    @Get(':id')
    async getContract(id: string) {
        // Logic to get a contract by ID
    }


    @Get()
    async getAllContracts() {
        // Logic to get all contracts
    }
}