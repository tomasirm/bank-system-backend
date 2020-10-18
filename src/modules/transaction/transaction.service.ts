import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionTypesService } from '../transaction-types/transaction-types.service';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class TransactionService {
  constructor(@InjectRepository(TransactionEntity) private readonly transactionEntityRepository: Repository<TransactionEntity>,
              private readonly customerService: CustomerService,
              private readonly transactionTypesService: TransactionTypesService) {
  }

  public async accountTransaction(transactionDto: TransactionDto): Promise<any> {
    if (transactionDto.transactionType == 'CARGA_SALDO') {
      await this.saveTransaction(transactionDto.customerDto.dni, transactionDto.transactionType, transactionDto.amount, 'DEPOSIT');
    } else if (transactionDto.transactionType == 'RETIRO_SALDO') {
      await this.saveTransaction(transactionDto.customerDto.dni, transactionDto.transactionType, transactionDto.amount, 'WITHDRAW');
    } else if (transactionDto.transactionType == 'TRANSFERENCIA_A_TERCEROS') {
      await this.saveTransaction(transactionDto.customerDto.dni, transactionDto.transactionType, transactionDto.amount, 'WITHDRAW');
      await this.saveTransaction(transactionDto.dniDestiny, 'TRANSFERENCIA_DE_TERCEROS', transactionDto.amount, 'DEPOSIT');
    }
    return { message: 'success' };

  }

  public async saveTransaction(dni: string, transactionTypeStr: string, amount: number, balanceType: string): Promise<void> {
    const customer = await this.customerService.findCustomerByDni(dni);
    const transactionType = await this.transactionTypesService.findTransactionType(transactionTypeStr);
    const transaction = new TransactionEntity();
    if (balanceType === 'DEPOSIT') {
      if ((customer.balance - amount) < 0) {
        throw new HttpException('Client doesnt have enough funds', HttpStatus.CONFLICT);
      }
      customer.balance -= amount;
    } else if(balanceType === 'WITHDRAW'){
      customer.balance += amount;
    }
    transaction.customerEntity = customer;
    transaction.amount = amount;
    transaction.transactionTypeEntity = transactionType;
    await transaction.save();
    await customer.save();
  }

}
