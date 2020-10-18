import { Column, Entity, OneToMany } from 'typeorm';
import { GenericEntity } from '../../common/generic.entity';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity({name: 'transaction_types'})
export class TransactionTypesEntity extends GenericEntity{

  @Column({ type: 'varchar', nullable: false, length: 50})
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 100})
  description: string;

  @OneToMany(type => TransactionEntity, transaction => transaction.transactionTypeEntity) // note: we will create author property in the Photo class below
  transactions: TransactionEntity[];

}
