import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { GenericEntity } from '../../common/generic.entity';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity({name: 'customer'})
export class CustomerEntity extends GenericEntity{
  @Column({ type: 'varchar', length: 20, nullable: true })
  dni: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  names: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  surnames: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  password: string;
  @Column({ type: 'int',  default:0 })
  balance: number;
  @OneToMany(type => TransactionEntity, transaction => transaction.customer) // note: we will create author property in the Photo class below
  transactions: TransactionEntity[];
}
