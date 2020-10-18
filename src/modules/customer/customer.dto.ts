import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsString } from 'class-validator';
import { CustomerEntity } from './customer.entity';

export class CustomerDto implements Readonly<CustomerDto>{
  @ApiModelProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiModelProperty({ required: true })
  @IsString()
  dni: string;


  @ApiModelProperty({ required: true })
  @IsString()
  names: string;

  @ApiModelProperty({ required: true })
  @IsString()
  surnames: string;

  @ApiModelProperty({ required: true })
  @IsString()
  createdAt: Date;

  @ApiModelProperty({ required: true })
  @IsString()
  updateAt: Date;

  @ApiModelProperty({ required: true })
  @IsString()
  email: string;

  @ApiModelProperty({ required: true })
  @IsString()
  password: string;

  @ApiModelProperty({ required: true })
  @IsNumber()
  balance: number;

  public static from(dto: Partial<CustomerDto>) {
    const it = new CustomerDto();
    it.dni = dto.dni;
    it.names = dto.names;
    it.surnames = dto.surnames;
    it.id = dto.id;
    it.createdAt = dto.createdAt;
    it.updateAt = dto.updateAt;
    it.email = dto.email;
    it.password = dto.password;
    it.balance = dto.balance;
    return it;
  }

  public static fromEntity(entity: CustomerEntity) {
    if(!entity) {
      return;
    }
    return this.from({
      dni: entity.dni,
      names: entity.names,
      surnames: entity.surnames,
      id: entity.id,
      createdAt: entity.createdAt,
      updateAt: entity.updateAt,
      email: entity.email,
      balance: entity.balance
    });
  }

  public toEntity() {
    const it = new CustomerEntity();
    it.dni = this.dni;
    it.names = this.names;
    it.surnames = this.surnames;
    it.id = this.id;
    it.createdAt = this.createdAt;
    it.updateAt = this.updateAt;
    it.password = this.password;
    it.email = this.email;
    it.balance = this.balance;
    return it;
  }
}
