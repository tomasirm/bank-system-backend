import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsString } from 'class-validator';
import { AccountEntity } from './account.entity';

export class AccountDto implements Readonly<AccountDto>{
  @ApiModelProperty({ required: true })
  @IsNumber()
  balance: number;

  @ApiModelProperty({ required: true })
  @IsString()
  createdAt: Date;

  @ApiModelProperty({ required: true })
  @IsString()
  updateAt: Date;

  public static from(dto: Partial<AccountDto>) {
    const it = new AccountDto();
    it.balance = dto.balance;
    it.createdAt = dto.createdAt;
    it.updateAt = dto.updateAt;
    return it;
  }

  public static fromEntity(entity: AccountEntity) {
    return this.from({
      balance: entity.balance,
      createdAt: entity.createdAt,
      updateAt: entity.updateAt,
    });
  }

  public toEntity() {
    const it = new AccountEntity();
    it.balance = this.balance;
    return it;
  }
}
