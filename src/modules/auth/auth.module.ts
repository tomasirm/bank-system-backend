import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerService } from '../customer/customer.service';
import { CustomerEntity } from '../customer/customer.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../common/constant';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService, CustomerService]
})
export class AuthModule {}
