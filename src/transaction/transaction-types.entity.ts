import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../shared/generic.entity';
import { TransactionEntity } from './transaction.entity';

@Entity({name: 'transaction_types'})
export class TransactionTypesEntity extends GenericEntity{
  @Column({ type: 'varchar', length: 30 })
  name: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  description: string;
  @OneToMany(type => TransactionEntity, transaction => transaction.transactionTypeEntity) // note: we will create author property in the Photo class below
  transactions: TransactionEntity[];
}
