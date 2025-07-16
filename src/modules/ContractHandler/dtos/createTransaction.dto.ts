import { Transform } from "class-transformer";
import { IsAlphanumeric, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches } from "class-validator";
import { ethers } from "ethers";

export class CreateTransactionDto {
    @IsNotEmpty()
    @Transform(({ value }) => ethers.parseEther(value))
    value: ethers.BigNumberish;

    @IsNotEmpty()
    @IsString()
    @Matches(/^0x[a-fA-F0-9]{40}$/, {
        message: 'receiverAddress must be a valid Ethereum address',
    })
    receiverAddress: string;

    @IsNotEmpty()
    @IsString()
    reason: string;
}