import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerDto } from '../customer/customer.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private customerService: CustomerService) {
  }

  async login(loginDto: LoginDto): Promise<any> {
    const customer = await this.customerService.getCustomerByEmailAndPass(loginDto.email, loginDto.password);
    if (!customer || !customer.id) {
      throw new HttpException('These credentials do not match our records', HttpStatus.NOT_FOUND);
    }
    const payload = { username: customer.email };
    return {
      customerDto: customer,
      access_token: this.jwtService.sign(payload),
    };
  }


}
