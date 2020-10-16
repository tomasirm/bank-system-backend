import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../shared/generic.entity';

@Entity({name: 'transaction_types'})
export class TransactionEntity extends GenericEntity{

  @Column({ type: 'varchar', nullable: false, length: 50})
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 50})
  description: string;

}
