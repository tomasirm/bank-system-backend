import { Injectable } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { CustomerService } from '../../../dist/modules/customer/customer.service';
import { TransactionTypesService } from '../transaction-types/transaction-types.service';

@Injectable()
export class TransactionService {
  constructor(@InjectRepository(TransactionEntity) private readonly transactionEntityRepository: Repository<TransactionEntity>,
              private readonly customerService: CustomerService,
              private readonly transactionTypesService: TransactionTypesService) {
  }

  public async saveTransaction(transactionDto: TransactionDto): Promise<TransactionDto>{

    const customer = await this.customerService.findCustomerByDni(transactionDto.customerDto.dni);
    const transactionType = await this.transactionTypesService.findTransactionType(transactionDto.transactionType);
    const transaction = new TransactionEntity();

    transaction.customerEntity = customer;
    transaction.amount = transactionDto.amount;
    transaction.transactionTypeEntity = transactionType;
    await transaction.save();
    return TransactionDto.fromEntity(transaction);
  }


}
