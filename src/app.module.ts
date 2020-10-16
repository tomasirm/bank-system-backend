import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), CustomerModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
