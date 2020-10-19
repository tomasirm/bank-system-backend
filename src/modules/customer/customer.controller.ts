import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './customer.dto';
import { CustomerEntity } from './customer.entity';
import { LoginDto } from '../auth/login.dto';

@Controller('customer')
export class CustomerController {

  constructor(private customerService: CustomerService) {
  }

  @Post('')
  async saveCustomer(customerEntity: CustomerEntity, @Body() customerDto: CustomerDto): Promise<CustomerDto> {
    return await this.customerService.saveCustomer(customerDto);
  }

  @Get(':dni')
  async getCustomer(@Param('dni') dni: string): Promise<CustomerDto> {
    return await this.customerService.getCustomerByDni(dni);
  }

  @Get('')
  async getAllCustomer(): Promise<CustomerDto[]> {
    return await this.customerService.getAllCustomers();
  }
  @Get('balance/:dni')
  async getBalance(@Param('dni') dni: string): Promise<number> {
    console.log(dni);
    return await this.customerService.getBalance(dni);
  }

  @Post('register')
  async register(@Body() customerDto: CustomerDto): Promise<CustomerDto> {
    return await this.customerService.saveCustomer( customerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    console.log(JSON.stringify(loginDto));
    return await this.customerService.login( loginDto);
  }


}

