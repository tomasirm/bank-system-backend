import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { GenericEntity } from '../shared/generic.entity';
import { AccountEntity } from '../account/account.entity';

@Entity({name: 'customer'})
export class CustomerEntity extends GenericEntity{
  @Column({ type: 'varchar', length: 20, nullable: false })
  dni: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  names: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  surname: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  password: string;
  @OneToOne(type => AccountEntity)
  @JoinColumn()
  accountEntity: Promise<AccountEntity>;
}
