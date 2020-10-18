import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { TransactionEntity } from './transaction.entity';
import { CustomerDto } from '../customer/customer.dto';
import { TransactionTypesDto } from '../transaction-types/transaction-types.dto';
import { Exclude } from 'class-transformer';

export class TransactionDto implements Readonly<TransactionDto> {
  @ApiModelProperty({ required: true })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiModelProperty({ required: true })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiModelProperty({ required: true })
  customerDto: CustomerDto;

  @ApiModelProperty({ required: true })
  @IsString()
  @IsOptional()
  createdAt: Date;

  @ApiModelProperty({ required: true })
  @IsString()
  @IsOptional()
  updateAt: Date;


  @ApiModelProperty({ required: true })
  @IsString()
  transactionType: string;

  @ApiModelProperty({ required: true })
  @IsString()
  dniDestiny: string;

  @ApiModelProperty({ required: true })
  @IsString()
  @IsOptional()
  description: string;

  @ApiModelProperty({ required: true })
  @IsNumber()
  @IsOptional()
  historicalBalance: number;

  @ApiModelProperty({ required: true })
  transactionTypeDto: TransactionTypesDto;

  public static from(dto: Partial<TransactionDto>) {
    const it = new TransactionDto();
    it.amount = dto.amount;
    it.createdAt = dto.createdAt;
    it.updateAt = dto.updateAt;
    it.customerDto = dto.customerDto;
    it.transactionTypeDto = dto.transactionTypeDto;
    it.id = dto.id;
    it.historicalBalance = dto.historicalBalance;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: TransactionEntity) {
    return this.from({
      id: entity.id,
      amount: entity.amount,
      createdAt: entity.createdAt,
      updateAt: entity.updateAt,
      historicalBalance: entity.historicalBalance,
      description: entity.description,
    });
  }

  public toEntity() {
    const it = new TransactionEntity();
    it.amount = this.amount;
    it.createdAt = this.createdAt;
    it.updateAt = this.updateAt;
    it.historicalBalance = this.historicalBalance;
    it.description = this.description;
    return it;
  }
}

