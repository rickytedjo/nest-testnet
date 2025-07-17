import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ContractService } from "../services";
import { ProviderService } from "src/common/utils";
import { CreateContractDto } from "../dtos";
import { CreateTransactionDto } from "../dtos/createTransaction.dto";

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
    async createTransaction(@Param('id') id: string,
        @Body() dto: CreateTransactionDto
    ) {
        // Logic to create a transaction for a contract
        return this.contractService.createTransaction(id, dto);
    }

    @Get()
    async getAllContracts() {
        // Logic to get all contracts
        return this.contractService.getAllContracts();
    }
}