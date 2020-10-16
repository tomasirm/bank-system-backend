import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { TransactionTypesEntity } from './transaction-types.entity';
import { GenericEntity } from '../shared/generic.entity';

@Entity({name: 'transaction'})
export class TransactionEntity extends GenericEntity{

  @Column({ type: 'int', nullable: false })
  amount: number;

  @ManyToOne(type => AccountEntity, account => account.transactions)
  @JoinColumn()
  accountEntity: AccountEntity;

  @ManyToOne(type => TransactionTypesEntity, transactionType => transactionType.transactions)
  @JoinColumn()
  transactionTypeEntity: TransactionTypesEntity;
}
