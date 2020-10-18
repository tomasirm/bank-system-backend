import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getManager, Repository, Transaction } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionTypesService } from '../transaction-types/transaction-types.service';
import { CustomerService } from '../customer/customer.service';
import { TransactionTypesDto } from '../transaction-types/transaction-types.dto';
import { CustomerDto } from '../customer/customer.dto';

@Injectable()
export class TransactionService {
  constructor(@InjectRepository(TransactionEntity) private readonly transactionEntityRepository: Repository<TransactionEntity>,
              private readonly customerService: CustomerService,
              private readonly transactionTypesService: TransactionTypesService) {
  }

  public async accountTransaction(transactionDto: TransactionDto): Promise<any>{
    if (transactionDto.transactionType == 'CARGA_SALDO') {
      await this.saveTransaction(transactionDto.customerDto.dni, transactionDto.transactionType, transactionDto.amount, 'DEPOSIT');
    } else if (transactionDto.transactionType == 'RETIRO_SALDO') {
      await this.saveTransaction(transactionDto.customerDto.dni, transactionDto.transactionType, transactionDto.amount, 'WITHDRAW');
    } else if (transactionDto.transactionType == 'TRANSFERENCIA_A_TERCEROS') {
      await this.saveTransaction(transactionDto.customerDto.dni, transactionDto.transactionType, transactionDto.amount, 'WITHDRAW', transactionDto.dniDestiny);
      await this.saveTransaction(transactionDto.dniDestiny, 'TRANSFERENCIA_DE_TERCEROS', transactionDto.amount, 'DEPOSIT', transactionDto.customerDto.dni);
    }else{
      throw new HttpException('Transaction type not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Succesful transaction' };

  }

  public async saveTransaction(dni: string, transactionTypeStr: string, amount: number, balanceType: string, otherDni?: string): Promise<any> {
    const customer = await this.customerService.findCustomerByDni(dni);

    if (!customer || !customer.id) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    const transactionType = await this.transactionTypesService.findTransactionType(transactionTypeStr);
    if (!transactionType || !transactionType.id) {
      throw new HttpException('Transaction type not found', HttpStatus.NOT_FOUND);
    }
    const transaction = new TransactionEntity();
    if (balanceType === 'WITHDRAW') {
      if ((customer.balance - amount) < 0) {
        throw new HttpException('Client doesnt have enough funds', HttpStatus.CONFLICT);
      }
      transaction.historicalBalance = customer.balance - amount;
      customer.balance -= amount;
    } else if (balanceType === 'DEPOSIT') {
      transaction.historicalBalance = customer.balance + amount;
      customer.balance += amount;
    }
    transaction.description = this.getDescriptionByTransactionType(transactionTypeStr, otherDni);
    transaction.customer = customer;
    transaction.amount = amount;
    transaction.transactionType = transactionType;
    await transaction.save();
    await customer.save();
  }

  public async getAllTransactions(dni: string): Promise<TransactionDto[]> {
    const transactions = await this.findAllTransactions(dni);
    const transactionsDto = new Array<TransactionDto>();
    transactions.forEach(transaction => {
      let transactionDto = new TransactionDto();
      transactionDto = TransactionDto.fromEntity(transaction);
      transactionDto.transactionTypeDto = TransactionTypesDto.from(transaction.transactionType);
      transactionDto.customerDto = CustomerDto.from(transaction.customer);
      transactionsDto.push(transactionDto);
    });
    return transactionsDto;
  }

  public async findAllTransactions(dni: string): Promise<any> {

    const transactions = await createQueryBuilder('transaction', 'transaction')
      .innerJoinAndMapOne('transaction.customer', 'transaction.customer', 'customer')
      .innerJoinAndMapOne('transaction.transactionType', 'transaction.transactionType', 'transactionType')
      .where('customer.dni = :dni', { dni: dni })
      .getMany();
    return transactions;
  }

  private getDescriptionByTransactionType(transactionTypeStr:string, otherDni?: string){
    if (transactionTypeStr == 'CARGA_SALDO') {
      return 'Ingreso de dinero';
    } else if (transactionTypeStr == 'RETIRO_SALDO') {
      return 'Retiro de dinero';
    } else if (transactionTypeStr == 'TRANSFERENCIA_A_TERCEROS') {
      return'Transferencia a rut ' + otherDni;
    } else if (transactionTypeStr == 'TRANSFERENCIA_DE_TERCEROS') {
      return'Transferencia desde rut ' + otherDni;
    }
  }


}
