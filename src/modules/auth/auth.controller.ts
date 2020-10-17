import { Body, Controller, Post } from '@nestjs/common';
import { CustomerDto } from '../customer/customer.dto';
import { CustomerService } from '../customer/customer.service';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

  constructor(private readonly customerService: CustomerService,
              private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() customerDto: CustomerDto): Promise<CustomerDto> {
    return await this.customerService.saveCustomer( customerDto);
  }

  @Post('login')
  async login(@Body() customerDto: CustomerDto): Promise<any> {
    console.log(JSON.stringify(customerDto));
    return await this.authService.login( customerDto);
  }

}

