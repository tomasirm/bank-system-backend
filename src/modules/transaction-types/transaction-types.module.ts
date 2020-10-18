import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypesService } from './transaction-types.service';
import { TransactionTypesController } from './transaction-types.controller';
import {  TransactionTypesEntity } from './transaction-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionTypesEntity])],
  controllers: [TransactionTypesController],
  providers: [ TransactionTypesService],
  exports: [TransactionTypesService]
})
export class TransactionTypesModule {}
