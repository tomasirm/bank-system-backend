import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class LoginDto{
  @ApiModelProperty({ required: true })
  @IsString()
  email: string;

  @ApiModelProperty({ required: true })
  @IsString()
  @Exclude()
  password: string;
}
