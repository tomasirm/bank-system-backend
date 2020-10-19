import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomerModule } from './modules/customer/customer.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionTypesModule } from './modules/transaction-types/transaction-types.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          port: config.get('DATABASE_PORT'),
          url: config.get('DATABASE_URL'),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASS'),
          database:config.get('DATABASE_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          /*synchronize: true,
          dropSchema: false*/
        } as TypeOrmModuleOptions;
      },
    }),
    CustomerModule,  AuthModule, TransactionTypesModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
