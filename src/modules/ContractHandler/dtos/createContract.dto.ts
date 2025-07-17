import { Transform } from "class-transformer";
import { IsAlphanumeric, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { ethers } from "ethers";

export class CreateContractDto {
    @IsNotEmpty({ message: 'Contract name is required' })
    @IsString({ message: 'Contract name must be a string' })
    @Transform(({ value }) => value.toString())
    contractName: string;

    @IsOptional()
    @IsNumberString({}, { message: 'Initial value must be a number' })
    @Transform(({ value }) => ethers.parseEther(value))
    initialValue?: ethers.BigNumberish;
}