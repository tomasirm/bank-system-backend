import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionEntity } from './transaction.entity';
import { TransactionTypesModule } from '../transaction-types/transaction-types.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), TransactionTypesModule, CustomerModule],
  controllers: [TransactionController],
  providers: [ TransactionService],
  exports: [TransactionService]
})
export class TransactionModule {}
