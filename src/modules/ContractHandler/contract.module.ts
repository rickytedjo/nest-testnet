import { Module } from "@nestjs/common";
import { ContractController } from "./controllers";
import { ContractService } from "./services";

@Module({
    imports: [],
    controllers: [ContractController],
    providers: [ContractService],
    exports: [],
})
export class ContractModule {}