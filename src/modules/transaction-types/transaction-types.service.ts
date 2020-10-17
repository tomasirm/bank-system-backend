import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionTypesDto } from './transaction-types.dto';
import { TransactionTypesEntity } from '../transaction/transaction-types.entity';
import { CustomerDto } from '../customer/customer.dto';

@Injectable()
export class TransactionTypesService {
  constructor(@InjectRepository(TransactionTypesEntity) private readonly transactionTypesEntityRepository: Repository<TransactionTypesEntity>) { }
/*
  public async saveTransactionType(transactionTypesDto: TransactionTypesDto): Promise<TransactionTypesDto> {
    let transactionTypeEntity  = await this.transactionTypesEntityRepository.findOne({name: transactionTypesDto.name});
    if(transactionTypeEntity && transactionTypeEntity.id) {
      throw new HttpException('Transaction Type already exists', HttpStatus.CONFLICT);
    }
    transactionTypeEntity = transactionTypesDto.toEntity();
    await transactionTypeEntity.save()

    /!*return this.transactionTypesEntityRepository.save(CustomerDto.from(customerDto).toEntity())
      .then(e => CustomerDto.fromEntity(e));*!/
  }*/
}
