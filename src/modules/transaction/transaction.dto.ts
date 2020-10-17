import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsString } from 'class-validator';
import { AccountDto } from '../account/account.dto';
import { TransactionEntity } from './transaction.entity';

export class TransactionDto implements Readonly<TransactionDto>{
  @ApiModelProperty({ required: true })
  @IsNumber()
  amount: number;

  @ApiModelProperty({ required: true })
  @IsString()
  accountDto: AccountDto;

  @ApiModelProperty({ required: true })
  @IsString()
  createdAt: Date;

  @ApiModelProperty({ required: true })
  @IsString()
  updateAt: Date;


  public static from(dto: Partial<TransactionDto>) {
    const it = new TransactionDto();
    it.amount = dto.amount;
    it.accountDto = dto.accountDto;
    return it;
  }

  public static fromEntity(entity: TransactionDto) {
    return this.from({
      amount: entity.amount,
      accountDto: entity.accountDto,
    });
  }

  public toEntity() {
    const it = new TransactionEntity();
    it.amount = this.amount;
    it.createdAt = this.createdAt;
    it.updateAt = this.updateAt;
    return it;
  }
}
