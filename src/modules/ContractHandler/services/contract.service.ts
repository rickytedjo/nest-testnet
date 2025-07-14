import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ContractService {
    // Service logic will go here
    constructor(private readonly config: ConfigService) {}

    
}