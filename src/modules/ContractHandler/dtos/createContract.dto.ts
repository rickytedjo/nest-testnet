import { Transform } from "class-transformer";
import { IsAlphanumeric, IsString } from "class-validator";

export class CreateContractDto {
    @IsString({ message: 'Contract name must be a string' })
    @Transform(({ value }) => value.toString())
    contractName: string;
}