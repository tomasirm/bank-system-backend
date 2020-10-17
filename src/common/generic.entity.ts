import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class GenericEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({nullable: true})
  createdAt: Date;
  @CreateDateColumn({nullable: true})
  updateAt: Date;
  @Column({default: true, nullable: false})
  active: boolean
}
