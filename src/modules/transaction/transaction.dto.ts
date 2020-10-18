import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { TransactionEntity } from './transaction.entity';
import { CustomerDto } from '../customer/customer.dto';

export class TransactionDto implements Readonly<TransactionDto>{
  @ApiModelProperty({ required: true })
  @IsNumber()
  amount: number;

  @ApiModelProperty({ required: true })
  @IsString()
  customerDto: CustomerDto;

  @ApiModelProperty({ required: true })
  @IsString()
  createdAt: Date;

  @ApiModelProperty({ required: true })
  @IsString()
  updateAt: Date;


  @ApiModelProperty({ required: true })
  @IsString()
  transactionType: string;

  @ApiModelProperty({ required: true })
  @IsString()
  dniDestiny: string;

  public static from(dto: Partial<TransactionDto>) {
    const it = new TransactionDto();
    it.amount = dto.amount;
    it.customerDto = dto.customerDto;
    return it;
  }

  public static fromEntity(entity: TransactionEntity) {
    return this.from({
      amount: entity.amount,
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
