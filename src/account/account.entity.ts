import { Column, Entity, OneToMany } from 'typeorm';
import { GenericEntity } from '../shared/generic.entity';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity({name: 'account'})
export class AccountEntity extends GenericEntity{
  @Column({ type: 'int', nullable: false, default: 0})
  balance: number;
  @OneToMany(type => TransactionEntity, transaction => transaction.accountEntity) // note: we will create author property in the Photo class below
  transactions: Promise<TransactionEntity[]>;

}
