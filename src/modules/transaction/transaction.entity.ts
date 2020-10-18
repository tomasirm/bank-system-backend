import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { GenericEntity } from '../../common/generic.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { TransactionTypesEntity } from '../transaction-types/transaction-types.entity';

@Entity({name: 'transaction'})
export class TransactionEntity extends GenericEntity{

  @Column({ type: 'int', nullable: false })
  amount: number;

  @ManyToOne(type => CustomerEntity, customer => customer.transactions, { eager: true})
  @JoinColumn()
  customer: CustomerEntity;

  @ManyToOne(type => TransactionTypesEntity, transactionType => transactionType.transactions, { eager: true})
  @JoinColumn()
  transactionType: TransactionTypesEntity;

  @Column({ type: 'int', nullable: true })
  historicalBalance: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  description: string;
}
