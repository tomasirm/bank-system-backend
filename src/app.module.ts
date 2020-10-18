import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { CustomerModule } from './modules/customer/customer.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionTypesModule } from './modules/transaction-types/transaction-types.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), CustomerModule,  AuthModule, TransactionTypesModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
