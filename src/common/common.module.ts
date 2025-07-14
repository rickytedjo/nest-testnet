import { Global, Module } from "@nestjs/common";
import { ProviderService } from "./utils";

@Global()
@Module({
  imports: [],
  providers: [
    ProviderService
  ],
  exports: [
    ProviderService
  ],
})
export class CommonModule {}   