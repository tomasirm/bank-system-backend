import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../common/constant';
import { CustomerModule } from '../customer/customer.module';
import { AuthService } from './auth.service';

@Module({
  imports: [CustomerModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
