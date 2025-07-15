import { Module } from '@nestjs/common';
import { ContractModule } from './modules/ContractHandler/contract.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    CommonModule,
    CoreModule,
    ModulesModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
