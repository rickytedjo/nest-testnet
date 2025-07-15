import { Module } from "@nestjs/common";
import { ContractModule } from "./ContractHandler/contract.module";

@Module({
  imports: [ContractModule]
})
export class ModulesModule {}