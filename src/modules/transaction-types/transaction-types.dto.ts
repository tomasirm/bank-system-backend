import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsString } from 'class-validator';
import { TransactionTypesEntity } from './transaction-types.entity';

export class TransactionTypesDto implements Readonly<TransactionTypesDto>{
  @ApiModelProperty({ required: true })
  @IsNumber()
  name: string;

  @ApiModelProperty({ required: true })
  @IsString()
  description: string;

  @ApiModelProperty({ required: true })
  @IsString()
  createdAt: Date;

  @ApiModelProperty({ required: true })
  @IsString()
  updateAt: Date;


  public static from(dto: Partial<TransactionTypesDto>) {
    const it = new TransactionTypesDto();
    it.name = dto.name;
    it.description = dto.description;
    it.updateAt = dto.updateAt;
    it.createdAt = dto.createdAt;
    return it;
  }

  public static fromEntity(entity: TransactionTypesEntity) {
    return this.from({
      name: entity.name,
      description: entity.description,
      updateAt: entity.updateAt,
      createdAt: entity.createdAt,
    });
  }

  public toEntity() {
    const it = new TransactionTypesEntity();
    it.name = this.name;
    it.description = this.description;
    it.createdAt = this.createdAt;
    it.updateAt = this.updateAt;
    return it;
  }
}
