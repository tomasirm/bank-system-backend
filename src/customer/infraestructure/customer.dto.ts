import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsString } from 'class-validator';
import { CustomerEntity } from '../customer.entity';
import { AccountDto } from '../../account/account.dto';

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
  surname: string;

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
  account: AccountDto;

  public static from(dto: Partial<CustomerDto>) {
    const it = new CustomerDto();
    it.dni = dto.dni;
    it.names = dto.names;
    it.surname = dto.surname;
    it.id = dto.id;
    it.createdAt = dto.createdAt;
    it.updateAt = dto.updateAt;
    it.email = dto.email;
    it.account = dto.account;
    return it;
  }

  public static fromEntity(entity: CustomerEntity) {
    if(!entity) {
      return;
    }
    console.log(entity)
    return this.from({
      dni: entity.dni,
      names: entity.names,
      surname: entity.surname,
      id: entity.id,
      createdAt: entity.createdAt,
      updateAt: entity.updateAt,
      email: entity.email,
    });
  }

  public toEntity() {
    const it = new CustomerEntity();
    it.dni = this.dni;
    it.names = this.names;
    it.surname = this.surname;
    it.id = this.id;
    it.createdAt = this.createdAt;
    it.updateAt = this.updateAt;
    it.password = this.password;
    it.email = this.email;
    return it;
  }
}
