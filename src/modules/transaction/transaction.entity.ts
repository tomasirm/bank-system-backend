import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { GenericEntity } from '../../common/generic.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { TransactionTypesEntity } from '../transaction-types/transaction-types.entity';

@Entity({name: 'transaction'})
export class TransactionEntity extends GenericEntity{

  @Column({ type: 'int', nullable: false })
  amount: number;

  @ManyToOne(type => CustomerEntity, customer => customer.transactions)
  @JoinColumn()
  customerEntity: CustomerEntity;

  @ManyToOne(type => TransactionTypesEntity, transactionType => transactionType.transactions)
  @JoinColumn()
  transactionTypeEntity: TransactionTypesEntity;


}
