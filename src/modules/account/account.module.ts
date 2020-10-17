import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';
import { AccountController } from './account.controller';
import { CustomerEntity } from '../customer/customer.entity';
import { CustomerService } from '../customer/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, CustomerEntity])],
  controllers: [AccountController],
  providers: [AccountService, CustomerService]
})
export class AccountModule {}
