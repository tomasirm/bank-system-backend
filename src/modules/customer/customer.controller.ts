import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './customer.dto';
import { CustomerEntity } from './customer.entity';

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

}

