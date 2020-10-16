import { Module } from '@nestjs/common';
import { CustomerController } from './infraestructure/customer.controller';
import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
