import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";
import { ProviderService } from "src/common/utils/provider.service";
import { PostgresService } from "src/core/psql/postgres.service";
import { CreateContractDto } from "../dtos";
import { Contract } from "../types";
import { CreateTransactionDto } from "../dtos/createTransaction.dto";
import { send } from "process";

@Injectable()
export class ContractService {
    // Service logic will go here
    constructor(
        private readonly config: ConfigService,
        private readonly providerService: ProviderService,
        private readonly postgresService: PostgresService
    ) {}

    

    async createContract(dto: CreateContractDto) {
        try{
        const { provider, wallet } = await this.providerService.getProviderAndWallet();
        if (!provider  || !wallet) {
            throw new Error('Provider or wallet not initialized');
        }
        // Create a new contract instance
        const {abi, bytecode} = await this.providerService.getAbiAndBytecode();
        if (!abi) {
            throw new Error('ABI not found');
        }
        
        const contract = new ethers.ContractFactory(
            abi,
            bytecode,
            wallet
        );

        // Contract deployment
        const contractInstance = await contract.deploy( dto.contractName ,{
            value: dto.initialValue ?? ethers.toBigInt(0)
        });

        await contractInstance.waitForDeployment();
        const deployedAddress = await contractInstance.getAddress();

        // Save contract address to the database
        const contractData: Contract = {
            contractaddress: deployedAddress,
            useraddress: wallet.address.toLowerCase(),
        }

        await this.postgresService.insert<Contract>('contracts', contractData);

        return {
            status: 'success',
            message: 'Contract created successfully at address: ' + deployedAddress,
        };
    }
    catch (error) {
        return {
            status: 'error',
            message: error.message || 'Contract creation failed',
        };}
    }

    async createTransaction(contractAddress: string, dto: CreateTransactionDto) {
        try {
        const { provider, wallet } = await this.providerService.getProviderAndWallet();
        if (!provider  || !wallet) {
            throw new Error('Provider or wallet not initialized');
        }
        if(await provider.getBalance(contractAddress) < ethers.toBigInt(dto.value)) {
            if(await provider.getBalance(wallet.address.toLowerCase()) < ethers.toBigInt(dto.value)) {
                throw new Error('Insufficient funds');
            }
            const sendFromOwner = await wallet.sendTransaction({
                to: contractAddress,
                value: dto.value,
            });

            await sendFromOwner.wait();
            console.log('Funds sent to contract from owner:', sendFromOwner.hash);
        }

        const {abi} = await this.providerService.getAbiAndBytecode();
        if (!abi) {
            throw new Error('ABI not found');
        }
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        const tx = await contract.sendTo(dto.receiverAddress, dto.value, dto.reason);

        await tx.wait();

        return {
            status: 'success',
            message: 'Transaction successful',
            transactionHash: tx.hash,
        };
    }
        catch (error) {
            return {
                status: 'error',
                message: error.message || 'Transaction failed',
            };
        }
    }

    async getAllContracts() {
        const { provider, wallet } = await this.providerService.getProviderAndWallet();
        if (!provider  || !wallet) {
            throw new Error('Provider or wallet not initialized');
        }

        const contractList = await this.postgresService.getAll<Contract>('contracts', {
            useraddress: wallet.address.toLowerCase(),
        });

        if (contractList.length === 0) {
            return 'No contracts found';
        }

        const { abi } = await this.providerService.getAbiAndBytecode();
        if (!abi) {
            throw new Error('ABI not found');
        }

        const contractsWithTx = await Promise.all(contractList.map(async contract => {
            const contractInstance = new ethers.Contract(contract.contractaddress, abi, provider);
            let transactions = [];
            let contractName = '';
            try {
                contractName = await contractInstance.getName();
                const rawTx = await contractInstance.getAllTransactions();
                transactions = rawTx.map(tx => ({
                    id: tx.id,
                    destination: tx.destination,
                    value: tx.value.toString(),
                    timestamp: tx.timestamp.toString(),
                    reason: tx.reason,
                }));
            } catch (err) {
                transactions = [];
            }
            return {
                contractAddress: contract.contractaddress,
                contractName,
                transactions,
            };
        }));

        return contractsWithTx;
    }
}