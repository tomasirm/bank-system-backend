import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerDto } from '../customer/customer.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private customerService: CustomerService) {
  }

  async login(customerDto: CustomerDto): Promise<any> {
    const customer = await this.customerService.getCustomerByEmailAndPass(customerDto.email, customerDto.password);
    if (!customer || !customer.id) {
      throw new HttpException('These credentials do not match our records', HttpStatus.NOT_FOUND);
    }
    const payload = { username: customer.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
