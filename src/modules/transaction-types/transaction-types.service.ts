import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionTypesEntity } from './transaction-types.entity';
import { CustomerDto } from '../customer/customer.dto';
import { TransactionTypesDto } from './transaction-types.dto';

@Injectable()
export class TransactionTypesService {
  constructor(@InjectRepository(TransactionTypesEntity) private readonly transactionTypesEntityRepository: Repository<TransactionTypesEntity>) {
  }

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



  public async findTransactionType(type: string): Promise<TransactionTypesEntity>{
    return await this.transactionTypesEntityRepository.findOne({name: type});
  }


  public async populate(): Promise<any> {
    const typeOne = new TransactionTypesEntity();
    typeOne.name = 'CARGA_SALDO';
    typeOne.description = 'Tipo de transaccion que simula una carga de saldo a la cuenta';
    await typeOne.save();

    const typeTwo = new TransactionTypesEntity();
    typeTwo.name = 'RETIRO_SALDO';
    typeTwo.description = 'Tipo de transaccion que simula un retiro de saldo a la cuenta';
    await typeTwo.save();

    const typeThree = new TransactionTypesEntity();
    typeThree.name = 'TRANSFERENCIA_A_TERCEROS';
    typeThree.description = 'Tipo de transaccion que simula una transferencia a terceros';
    await typeThree.save();

    const typeFour = new TransactionTypesEntity();
    typeFour.name = 'TRANSFERENCIA_DE_TERCEROS';
    typeFour.description = 'Tipo de transaccion que simula una transferencia de terceros';
    await typeFour.save();

    return { message: 'Tipos de transferencias guardadas con exito' };
  }

  public async getAllTransactions(){
    return await this.transactionTypesEntityRepository.find()
      .then(transactionTypes => transactionTypes.map(transactionType => TransactionTypesDto.fromEntity(transactionType)));
  }
}
